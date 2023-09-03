.PHONY: start
start: database
	@docker-compose up server -d && docker-compose logs -ft server

.PHONY: tests
tests: database
	@docker-compose up tests -d && docker-compose logs -ft tests

.PHONY: database
start-db: stop
	@docker-compose up database -d

.PHONY: stop
stop:
	@docker-compose stop
