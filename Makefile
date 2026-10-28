default: help

help: # Display all commands available
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | gawk 'match($$0, /(makefile:)?(.*):.*?## (.*)/, a) {printf "\033[36m%-30s\033[0m %s\n", a[2], a[3]}'

install: # Install dependencies in local
	pnpm install

lint: # Lint project
	pnpm run lint

lint-fix: # Lint project
	pnpm run lint-fix

build: # Build TS projects
	pnpm run build

start: # Start maildev for development purpose
	docker run --name maildev -d -p 1080:1080 -p 1025:1025 maildev/maildev:3.0.0 && pnpm run wait-on

stop: # Stop maildev
	docker stop maildev && docker rm maildev

test: # Launch cypress test
	pnpm run e2e
