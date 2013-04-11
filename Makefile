 test:
	@NODE_ENV=test node_modules/mocha/bin/mocha \
		--reporter spec \
		test/*.test.js

.PHONY: test
