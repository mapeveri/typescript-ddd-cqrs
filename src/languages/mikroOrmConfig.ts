import { Migrator } from '@mikro-orm/migrations';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';

import { config as loadEnv } from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'path';
import { entitySchemas as languagesEntitySchemas } from '@src/languages/_dependencyInjection/entitySchemas';

const env = loadEnv();
dotenvExpand.expand(env);

const migrationPath = path.join(__dirname, 'infrastructure/persistence/mikroOrm/migrations');

export const mikroOrmConfiguration = {
  entities: languagesEntitySchemas,
  entitiesTs: languagesEntitySchemas,
  driver: PostgreSqlDriver,
  clientUrl: process.env.POSTGRESQL_DB_URL,
  debug: process.env.ENV != 'production',
  extensions: [Migrator],
  ignoreUndefinedInQuery: true,
  forceUndefined: false,
  registerRequestContext: false,
  migrations: {
    path: migrationPath,
    glob: '{languages}/*.{js,ts}',
    pathTs: migrationPath,
    tableName: 'mikro_orm_migrations',
    transactional: true,
    allOrNothing: true,
    snapshot: false,
  },
};

export default defineConfig(mikroOrmConfiguration);
