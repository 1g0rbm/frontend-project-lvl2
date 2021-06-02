check: lint test

publish:
	npm publish --dry-run
install:
	npm ci
link:
	npm link
test:
	npm test
lint:
	npx eslint .
lint-fix:
	npx eslint . --fix
