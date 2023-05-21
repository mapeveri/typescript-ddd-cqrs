# Typescript-ddd-cqrs backend

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
    docker-compose run app bash npm run typeorm migration:run
```
5. Create user via google.

### Running

After running docker-compose up the application will be available at https://localhost:4000.

### Migrations

To generate migrations run the next command:
```shell script
  docker-compose run app bash npm run typeorm migration:generate migrationName
```

To execute migrations run the next command:
```shell script
  docker-compose run app bash npm run typeorm migration:run
```

### Oauth2:

To get a token for testing you should go to https://developers.google.com/oauthplayground and configure it as "Use your own OAuth credentials" after that you should use Google OAuth2 API v2.

## Production

For production run the next command:
```shell script
    docker-compose run app bash npm run start
```
You need to make sure that you configure the .env file correctly. TYPE_ORM_ENTITIES env variable must use the javascript path.
