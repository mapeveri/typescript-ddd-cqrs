import { Migrator } from '@mikro-orm/migrations';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';

import { config as loadEnv } from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'path';
import { entitySchemas as languageEntitySchemas } from '@src/language/_dependencyInjection/entitySchemas';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

const env = loadEnv({ path: path.resolve(process.cwd(), envFile) });
dotenvExpand.expand(env);

const migrationPath = path.join(__dirname, 'infrastructure/persistence/mikroOrm/migrations');

export const MIKRO_ORM_CONTEXT_NAME = 'language';

export const mikroOrmConfiguration = {
  contextName: MIKRO_ORM_CONTEXT_NAME,
  entities: languageEntitySchemas,
  entitiesTs: languageEntitySchemas,
  schema: MIKRO_ORM_CONTEXT_NAME,
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
    snapshot: true,
  },
};

export default defineConfig(mikroOrmConfiguration);
