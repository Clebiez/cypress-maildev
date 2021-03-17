default: help

help: # Display all commands available
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | gawk 'match($$0, /(makefile:)?(.*):.*?## (.*)/, a) {printf "\033[36m%-30s\033[0m %s\n", a[2], a[3]}'

install: # Install dependencies in local
	npm install

build: # Build cypress image
	docker-compose build

start: # Start maildev for development purpose
	docker-compose up maildev -d --force-recreate

test: # Launch cypress test
	docker-compose run cypress
