# Typescript-ddd-cqrs backend

Api Rest with Nest + Hexagonal Architecture + DDD & CQRS.

## Development

Configuration for development.

### Configuration

1. Copy .env.example to .env and configure it.

2. Execute docker-compose: 
```shell script
    docker-compose up
```
4. Run migrations:
```shell script
    docker-compose run app npm run typeorm migration:run
```
5. Create user with google (check oauth2 section). It's to get a token from google and it allow you to use the endpoint /api/v1/auth/login to log in to the application.

### Running

After running docker-compose up the application will be available at https://localhost:4000.

### Migrations

To generate migrations run the next command:
```shell script
  docker-compose run app npm run typeorm migration:generate migrationName
```

To execute migrations run the next command:
```shell script
  docker-compose run app npm run typeorm migration:run
```

### Oauth2:

To get a token for testing you should go to https://developers.google.com/oauthplayground and configure it as "Use your own OAuth credentials" after that you should use Google OAuth2 API v2.

### Consume async domain events:

To consume async domain events you need to run the next command:

```
  make run-consume-domain-events
```

## Deployment with Kubernetes

Follow the readme in [.k8s/README.md](https://github.com/mapeveri/typescript-ddd-cqrs/blob/master/.k8s/README.md)

