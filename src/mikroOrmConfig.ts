import { Migrator } from '@mikro-orm/migrations';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';

import { config as loadEnv } from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'path';
import { entitySchemas as accountEntitySchemas } from '@src/account/_dependencyInjection/entitySchemas';
import { entitySchemas as languagesEntitySchemas } from '@src/languages/_dependencyInjection/entitySchemas';

const env = loadEnv();
dotenvExpand.expand(env);

const migrationPath = path.join(__dirname, 'infrastructure/persistence/mikroOrm/migrations');
const entitySchemas = [...accountEntitySchemas, ...languagesEntitySchemas];

export const mikroOrmConfiguration = {
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
    glob: '{account,languages}/*.{js,ts}',
    pathTs: migrationPath,
    tableName: 'mikro_orm_migrations',
    transactional: true,
    allOrNothing: true,
    snapshot: false,
  },
};

export default defineConfig(mikroOrmConfiguration);
