import { Migrator } from '@mikro-orm/migrations';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';

import { config as loadEnv } from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'path';
import { entitySchemas as languageEntitySchemas } from '@src/language/_dependencyInjection/entitySchemas';

const env = loadEnv();
dotenvExpand.expand(env);

const migrationPath = path.join(__dirname, 'infrastructure/persistence/mikroOrm/migrations');

export const MIKRO_ORM_CONTEXT_NAME = 'language';

export const mikroOrmConfiguration = {
  contextName: MIKRO_ORM_CONTEXT_NAME,
  entities: languageEntitySchemas,
  entitiesTs: languageEntitySchemas,
  driver: PostgreSqlDriver,
  clientUrl: process.env.POSTGRESQL_DB_URL,
  debug: process.env.ENV != 'production',
  extensions: [Migrator],
  ignoreUndefinedInQuery: true,
  forceUndefined: false,
  registerRequestContext: false,
  migrations: {
    path: migrationPath,
    glob: '*.{js,ts}',
    pathTs: migrationPath,
    tableName: 'mikro_orm_migrations',
    transactional: true,
    allOrNothing: true,
    snapshot: false,
  },
};

export default defineConfig(mikroOrmConfiguration);
