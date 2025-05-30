import { vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MikroORM } from '@mikro-orm/core';
import { AppModule } from '@src/app.module';
import { NestJwtAuthGuard } from '@src/shared/infrastructure/auth/jwt/nestJwtAuthGuard';
import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const USER_ID_LOGGED = '94400f7c-9a20-464c-9951-93b404b5877e';

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
  const orm = moduleFixture.get(MikroORM);
  const schemaGenerator = orm.getSchemaGenerator();

  await schemaGenerator.ensureDatabase();
  await schemaGenerator.updateSchema({ dropDb: false });
  await schemaGenerator.clearDatabase({ truncate: true });
  await app.init();

  return { app, orm };
}
