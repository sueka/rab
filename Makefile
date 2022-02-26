# This Makefile will not be concerned in node_modules nor .env!

NPX := npx

src := $(shell find src ! -name "*.css.d.ts" ! -path "src/crate/pkg/*" ! -path "src/crate/target/*" -type f)
messages-src := $(shell find src -name messages.ts -type f)
messages := public/messages/en.json public/messages/he.json public/messages/ja.json
crate-src := $(shell find src/crate -type f ! -path "src/crate/pkg/*" ! -path "src/crate/target/*")
css-src := $(shell find src -name "*.css" -type f)
css-src := $(filter-out src/classes.css, $(css-src))
css-d := $(patsubst %.css, %.css.d.ts, $(css-src))

value-deps := $(src) $(messages) src/crate/pkg
type-deps := $(src) $(messages) $(css-d) src/crate/pkg

.DEFAULT_GOAL := build

.PHONY : build develop extract-messages tcm wasm-pack check lint eslint tslint stylelint type-check clean clobber

build : dist
dist : webpack.config.ts $(value-deps)
	-rm -r $@/
	$(NPX) webpack --config webpack.config.ts

# TODO: Prefer heredoc/herestring to echo.
develop : webpack.config.dev.ts $(value-deps)
	@echo $(src) | tr " " '\n' | entr -r make lint &
	@echo $(type-deps) | tr " " '\n' | entr -r make type-check &
	$(NPX) webpack serve --config webpack.config.dev.ts

extract-messages : $(messages)
$(messages) : $(messages-src)
	$(NPX) extract-messages --flat --default-locale=en --locales=en,he,ja --output=public/messages src/**/messages.ts

tcm : $(css-d)
$(css-d) : $(css-src)
	$(NPX) tcm --pattern "src/components/**/*.css"
	@touch $(css-d)

wasm-pack : src/crate/pkg
src/crate/pkg : $(crate-src)
	$(NPX) wasm-pack build --out-name index src/crate

check :
	@make lint type-check test

lint :
	@make eslint tslint stylelint

eslint : .eslintrc.json $(src)
	$(NPX) eslint --ext ".ts, .tsx" src

tslint : tsconfig.json tsconfig.json $(src)
	$(NPX) tslint --project .

stylelint : .stylelintrc $(css-src)
	$(NPX) stylelint src/**/*.css

type-check : tsconfig.prod.json $(type-deps)
	$(NPX) tsc --noEmit --project ./tsconfig.prod.json

type-check-for-dev : tsconfig.json $(type-deps)
	$(NPX) tsc --noEmit --project .

test : jest.config.js $(value-deps)
	$(NPX) jest --coverage

test-w-o-cov : jest.config.js $(value-deps)
	$(NPX) jest

# TODO: $(value-deps) を interrupt に更新する。
test-in-watch-mode : jest.config.js $(value-deps)
	$(NPX) jest --onlyChanged --watch

update-snapshots : jest.config.js $(value-deps)
	$(NPX) jest --updateSnapshot

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
