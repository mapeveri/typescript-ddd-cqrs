# Typescript-ddd-cqrs backend

Api Rest with Nest + Hexagonal Architecture + DDD & CQRS.

## Development

Configuration to work locally using docker.

### Configuration

1. Copy .env.example to .env and configure it.

2. Execute docker compose: 
```shell script
    docker compose up
```
4. Run migrations:
```shell script
  docker compose run app npm run migration account up
  docker compose run app npm run migration language up
```
5. Create user with google (check oauth2 section). It's to get a token from google and it allow you to use the endpoint /api/v1/auth/login to log in to the application.

### Running

After running *docker compose up*, the application will be available at http://localhost:4000

### Migrations

To generate migrations run the next command:
```shell script
  docker compose run app npm run migration account create
  docker compose run app npm run migration language create
```

To execute migrations run the next command:
```shell script
  docker compose run app npm run migration account up
  docker compose run app npm run migration language up
```

### Oauth2

To obtain a test token, go to Google OAuth Playground (https://developers.google.com/oauthplayground) and select 'Use your own OAuth credentials'. Then, use the Google OAuth2 API v2.

### Consume async domain events

To consume async domain events you need to run the next command:

```
  make run-consume-domain-events
```

## Deployment with Kubernetes

To deploy in K8S follow the readme in [.k8s/README.md](https://github.com/mapeveri/typescript-ddd-cqrs/blob/master/.k8s/README.md)

