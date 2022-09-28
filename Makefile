# This Makefile will not be concerned in node_modules nor .env!

NPX := npx

LUSP-OPENAPI-SPEC := https://raw.githubusercontent.com/sueka/lusp/master/lusp.openapi3.yml

src := $(shell find src -name "*.ts" ! -name "*.css.d.ts" ! -path "src/crate/*" -type f)
messages-src := $(shell find src -name messages.ts -type f)
messages := public/messages/en.json public/messages/he.json public/messages/ja.json
crate-src := $(shell find src/crate -type f ! -path "src/crate/pkg/*" ! -path "src/crate/target/*")
css-src := $(shell find src -name "*.css" -type f)
css-d-src := $(css-src)
css-d-src := $(filter-out src/global.css, $(css-d-src))
css-d-src := $(filter-out src/transition.css, $(css-d-src))
css-d := $(patsubst %.css, %.css.d.ts, $(css-d-src))
gh-pages-src := $(wildcard gh-pages/src/*)

value-deps := $(src) $(messages) src/lusp-client src/crate/pkg
type-deps := $(src) $(messages) $(css-d) src/lusp-client src/crate/pkg

.DEFAULT_GOAL := build

.PHONY : FORCE build served messages cssd lusp-client crate-pkg check linted eslinted stylelinted typed tested test-job up-to-date-snapshots doc clean clobber

# FORCE :

build : dist
dist : webpack.config.ts $(value-deps)
	-rm -r $@/
	$(NPX) webpack --config $<

# FIXME: 計測して、必要なら一連の `@echo` を `@echo $(value-deps) | tr " " '\n' | entr -r $(MAKE) messages cssd src/crate/pkg` に置き換える。
served : webpack.config.dev.ts $(value-deps)
	@echo $(messages-src) | tr " " '\n' | entr -r $(MAKE) messages &
	@echo $(css-d-src) | tr " " '\n' | entr -r $(MAKE) cssd &
	@echo $(crate-src) | tr " " '\n' | entr -r $(MAKE) src/crate/pkg &
	$(NPX) webpack serve --config $<

# TODO: Type-check?
gh-pages/dist : gh-pages/webpack.config.ts $(gh-pages-src)
	-rm -r $@/
	$(NPX) webpack --config $<

messages : $(messages)
$(messages) : $(messages-src)
	$(NPX) extract-messages --flat --default-locale=en --locales=en,he,ja --output=public/messages src/**/messages.ts

cssd : $(css-d)
$(css-d) : $(css-d-src)
	$(NPX) tcm --pattern "src/components/**/*.css"
	@touch $(css-d)

lusp-client : src/lusp-client
src/lusp-client : FORCE
	$(NPX) openapi-generator-cli generate \
	--input-spec $(LUSP-OPENAPI-SPEC) \
	--generator-name typescript-fetch \
	--output $@

crate-pkg : src/crate/pkg
src/crate/pkg : $(crate-src)
	$(NPX) wasm-pack build --out-name index src/crate

check :
	@$(MAKE) linted typed tested

linted :
	@$(MAKE) eslinted stylelinted

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
	-rm -r .cache/ coverage/ dist/ doc/ src/crate/pkg/ src/crate/target/ src/lusp-client openapitools.json
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
	$(confirm)
	@$(MAKE) clean
	-rm -r node_modules/
	-rm .env

define confirm
@while : ; do \
	printf %s "Do you want to continue? (y/n) [n]: " && \
	read -r && \
	case $$REPLY in \
		(Y|y) exit 0 ;; \
		(''|N|n) exit 1 ; \
	esac \
done
endef
