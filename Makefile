# This Makefile will not be concerned in node_modules nor .env!

NPX := npx

src = $(shell find src -type f)
crate-src = $(shell find src/crate -type f ! -path "src/crate/pkg/*" ! -path "src/crate/target/*")

.DEFAULT_GOAL = build

.PHONY : build wasm-pack type-check clean clobber

build : dist
dist : webpack.config.ts $(src) wasm-pack
	rm -rf $@/
	$(NPX) webpack --config webpack.config.ts

wasm-pack : src/crate/pkg
src/crate/pkg : $(crate-src)
	$(NPX) wasm-pack build --out-name index src/crate

type-check : tsconfig.prod.json $(src) wasm-pack
	$(NPX) tsc --noEmit -p ./tsconfig.prod.json

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

clobber : clean
	-rm -r node_modules/
	-rm .env
