import { vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '@src/app.module';
import { NestJwtAuthGuard } from '@src/shared/infrastructure/auth/jwt/nestJwtAuthGuard';
import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { getMikroORMToken } from '@mikro-orm/nestjs';
import { MIKRO_ORM_CONTEXT_NAME as AccountOrmContextName } from '@src/account/mikroOrmConfig';
import { MIKRO_ORM_CONTEXT_NAME as LanguageOrmContextName } from '@src/language/mikroOrmConfig';
import { MikroORM } from '@mikro-orm/core';

export const USER_ID_LOGGED = '94400f7c-9a20-464c-9951-93b404b5877e';

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

export async function createApplication() {
  const user = { userId: USER_ID_LOGGED } as never;

  const mockAuthGuard = {
    canActivate: (context: ExecutionContext) => {
      const req = context.switchToHttp().getRequest<Request>();
      req.user = { id: USER_ID_LOGGED };
      return true;
    },
  };

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.test' }), AppModule],
  })
    .overrideGuard(NestJwtAuthGuard)
    .useValue(mockAuthGuard)
    .overrideProvider(JwtService)
    .useValue({
      verifyAsync: vi.fn().mockResolvedValue(user),
    })
    .compile();

  const app = moduleFixture.createNestApplication();
  const ormAccount: MikroORM = moduleFixture.get(getMikroORMToken(AccountOrmContextName));
  const ormLanguage: MikroORM = moduleFixture.get(getMikroORMToken(LanguageOrmContextName));

  await runMigrations(ormAccount, 'account');
  await runMigrations(ormLanguage, 'language');

  await app.init();

  return {
    app,
    ormAccount,
    ormLanguage,
  };
}
