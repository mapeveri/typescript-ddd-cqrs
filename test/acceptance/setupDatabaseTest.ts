import 'ts-node/register';
import 'tsconfig-paths/register';

import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from '@src/app.module';
import { getMikroORMToken } from '@mikro-orm/nestjs';
import { MIKRO_ORM_CONTEXT_NAME as AccountOrmContextName } from '@src/account/mikroOrmConfig';
import { MIKRO_ORM_CONTEXT_NAME as LanguageOrmContextName } from '@src/language/mikroOrmConfig';
import { MikroORM } from '@mikro-orm/core';
import path from 'path';

const envTestPath = `${path.dirname(__dirname)}/.env.test`;
require('dotenv').config({ path: envTestPath, override: true });

async function runMigrations(orm: MikroORM, schema: string) {
  const generator = orm.getSchemaGenerator();
  const connection = orm.em.getConnection();

  const result = await connection.execute('SELECT schema_name FROM information_schema.schemata WHERE schema_name = ?', [
    schema,
  ]);

  const schemaExists = result.length > 0;

  if (!schemaExists) {
    console.log(`[Schema: ${schema}] Creating schema...`);
    await generator.createSchema();
  }

  const migrator = orm.getMigrator();
  const pendingMigrations = await migrator.getPendingMigrations();

  if (pendingMigrations.length > 0) {
    console.log(`[Schema: ${schema}] Running ${pendingMigrations.length} pending migrations...`);
    await migrator.up();
  } else {
    console.log(`[Schema: ${schema}] No pending migrations`);
  }
}

export default async function () {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.test' }), AppModule],
  }).compile();

  const ormAccount: MikroORM = moduleFixture.get(getMikroORMToken(AccountOrmContextName));
  const ormLanguage: MikroORM = moduleFixture.get(getMikroORMToken(LanguageOrmContextName));

  await runMigrations(ormAccount, 'account');
  await runMigrations(ormLanguage, 'language');
}
