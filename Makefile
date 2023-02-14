default: help

help: # Display all commands available
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | gawk 'match($$0, /(makefile:)?(.*):.*?## (.*)/, a) {printf "\033[36m%-30s\033[0m %s\n", a[2], a[3]}'

install: # Install dependencies in local
	npm install

build: # Build TS projects
	npm run build

start: # Start maildev for development purpose
	docker-compose up -d maildev

stop: # Stop maildev
	docker-compose stop

test: # Launch cypress test
	npm run e2e
