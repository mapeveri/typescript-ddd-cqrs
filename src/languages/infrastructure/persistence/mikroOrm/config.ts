import { Migrator } from '@mikro-orm/migrations';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { entitySchemas } from '@src/shared/_dependencyInjection/entitySchemas';
import { config as loadEnv } from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'path';

const env = loadEnv();
dotenvExpand.expand(env);

const migrationPath = path.join(__dirname, '/migrations');

export default defineConfig({
  entities: entitySchemas,
  entitiesTs: entitySchemas,
  driver: PostgreSqlDriver,
  clientUrl: process.env.POSTGRESQL_DB_URL,
  debug: process.env.ENV != 'production',
  extensions: [Migrator],
  ignoreUndefinedInQuery: true,
  forceUndefined: false,
  migrations: {
    path: migrationPath,
    glob: '!(*.d).{js,ts}',
    pathTs: migrationPath,
    tableName: 'mikro_orm_migrations',
    transactional: true,
    allOrNothing: true,
    snapshot: false,
  },
});
