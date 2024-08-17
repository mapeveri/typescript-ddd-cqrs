import { Migrator } from '@mikro-orm/migrations';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { entitySchemas } from '@src/shared/_dependencyInjection/entitySchemas';
import { config as loadEnv } from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'path';

const env = loadEnv();
dotenvExpand.expand(env);

const migrationPath = '../../../../languages/app/mikroorm-migrations';

export default defineConfig({
  entities: entitySchemas,
  entitiesTs: entitySchemas,
  driver: PostgreSqlDriver,
  clientUrl: process.env.POSTGRESQL_DB_URL,
  debug: process.env.ENV != 'production',
  extensions: [Migrator],
  migrations: {
    path: path.join(__dirname, `${migrationPath}`),
    pathTs: path.join(__dirname, `${migrationPath}`),
  },
});
