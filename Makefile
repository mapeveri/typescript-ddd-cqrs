run-consume-domain-events: ## consume domain events
	docker exec -it languages-container npm run consumer:domain-events
