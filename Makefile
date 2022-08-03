# This Makefile will not be concerned in node_modules nor .env!

NPX := npx

src := $(shell find src ! -name "*.css.d.ts" ! -path "src/crate/*" -type f)
messages-src := $(shell find src -name messages.ts -type f)
messages := public/messages/en.json public/messages/he.json public/messages/ja.json
crate-src := $(shell find src/crate -type f ! -path "src/crate/pkg/*" ! -path "src/crate/target/*")
css-src := $(shell find src -name "*.css" -type f)
css-src := $(filter-out src/global.css, $(css-src))
css-src := $(filter-out src/transition.css, $(css-src))
css-d := $(patsubst %.css, %.css.d.ts, $(css-src))
gh-pages-src := $(wildcard gh-pages/src/*)

value-deps := $(src) $(messages) src/crate/pkg
type-deps := $(src) $(messages) $(css-d) src/crate/pkg

.DEFAULT_GOAL := build

.PHONY : build served messages cssd crate-pkg check linted eslinted stylelinted typed tested test-job up-to-date-snapshots doc clean clobber

build : dist
dist : webpack.config.ts $(value-deps)
	-rm -r $@/
	$(NPX) webpack --config $<

# FIXME: Measure it and do `@echo $(value-deps) | tr " " '\n' | entr -r make messages cssd src/crate/pkg` as a substitute if needed.
# TODO: Prefer heredoc/herestring to echo.
served : webpack.config.dev.ts $(value-deps)
	@echo $(messages-src) | tr " " '\n' | entr -r make messages &
	@echo $(css-src) | tr " " '\n' | entr -r make cssd &
	@echo $(crate-src) | tr " " '\n' | entr -r make src/crate/pkg &
	$(NPX) webpack serve --config $<

# TODO: Type-check?
gh-pages/dist : gh-pages/webpack.config.ts $(gh-pages-src)
	-rm -r $@/
	$(NPX) webpack --config $<

messages : $(messages)
$(messages) : $(messages-src)
	$(NPX) extract-messages --flat --default-locale=en --locales=en,he,ja --output=public/messages src/**/messages.ts

cssd : $(css-d)
$(css-d) : $(css-src)
	$(NPX) tcm --pattern "src/components/**/*.css"
	@touch $(css-d)

crate-pkg : src/crate/pkg
src/crate/pkg : $(crate-src)
	$(NPX) wasm-pack build --out-name index src/crate

check :
	@make linted typed tested

linted :
	@make eslinted stylelinted

eslinted : .eslintrc.json $(src)
	$(NPX) eslint --ext ".ts, .tsx" src

stylelinted : .stylelintrc $(css-src)
	$(NPX) stylelint src/**/*.css

typed : tsconfig.prod.json $(type-deps)
	$(NPX) tsc --noEmit --project ./$<

tested : jest.config.js $(value-deps)
	$(NPX) jest --coverage

# TODO: $(value-deps) を interrupt に更新する。
test-job : jest.config.js $(value-deps)
	$(NPX) jest --onlyChanged --watch

up-to-date-snapshots : jest.config.js $(value-deps)
	$(NPX) jest --updateSnapshot

doc : $(type-deps)
	$(NPX) typedoc

# Keep comparing with .gitignore...
### Remove all files that neither are tracked by Git except files in node_modules/ and .env.
clean :
	-rm -r .cache/ coverage/ dist/ doc/ src/crate/pkg/ src/crate/target/
	find . \
		-name "*.js" \
		! -path ./babel.config.js \
		! -path ./jest.config.js \
		! -path ./typedoc.js \
		-type f \
		! -path "./node_modules/*" \
		-exec rm {} +
	find . \
		-name "*.jsx" \
		-type f \
		! -path "./node_modules/*" \
		-exec rm {} +
	-rm -r gh-pages/dist/

clobber :
	@make clean
	-rm -r node_modules/
	-rm .env
