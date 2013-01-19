test:
	./node_modules/.bin/mocha -u tdd -s 0 --reporter spec tests/tests.js

.PHONY: test
