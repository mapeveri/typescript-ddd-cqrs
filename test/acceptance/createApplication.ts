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
import { ISchemaGenerator, MikroORM } from '@mikro-orm/core';

export const USER_ID_LOGGED = '94400f7c-9a20-464c-9951-93b404b5877e';

async function resetSchema(generator: ISchemaGenerator, schemaName: string) {
  try {
    await generator.execute(`DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`);
    await generator.ensureDatabase();
    await generator.createSchema();
  } catch (err) {
    console.error(`[Schema: ${schemaName}] Error while resetting schema`, err);
    throw err;
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

  const accountSchemaGenerator = ormAccount.getSchemaGenerator();
  const languageSchemaGenerator = ormLanguage.getSchemaGenerator();

  await Promise.all([accountSchemaGenerator.ensureDatabase(), languageSchemaGenerator.ensureDatabase()]);

  await resetSchema(accountSchemaGenerator, 'account');
  await resetSchema(languageSchemaGenerator, 'language');

  await app.init();

  return { app, ormAccount: ormAccount, ormLanguage: ormLanguage };
}
