check: lint test

publish:
	npm publish --dry-run
install:
	npm ci
link:
	npm link
lint:
	npx eslint .
lint-fix:
	npx eslint . --fix
test:
	npm test
