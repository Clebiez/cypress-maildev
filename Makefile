default: help

help: # Display all commands available
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | gawk 'match($$0, /(makefile:)?(.*):.*?## (.*)/, a) {printf "\033[36m%-30s\033[0m %s\n", a[2], a[3]}'

install: # Install dependencies in local
	npm install

lint: # Lint project
	npm run lint

lint-fix: # Lint project
	npm run lint-fix

build: # Build TS projects
	npm run build

start: # Start maildev for development purpose
	docker run --name maildev -d -p 1080:1080 -p 1025:1025 maildev/maildev && npm run wait-on

stop: # Stop maildev
	docker stop maildev && docker rm maildev

test: # Launch cypress test
	npm run e2e
