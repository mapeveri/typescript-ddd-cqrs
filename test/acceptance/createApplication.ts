import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MikroORM } from '@mikro-orm/core';
import { AppModule } from '@src/app.module';
import { NestJwtAuthGuard } from '@src/shared/guards/nestJwtAuthGuard';
import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export async function createApplication() {
  const userId = '94400f7c-9a20-464c-9951-93b404b5877e';
  const user = { userId } as never;

  const mockAuthGuard = {
    canActivate: (context: ExecutionContext) => {
      const req = context.switchToHttp().getRequest<Request>();
      req.user = { id: userId };
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
      verifyAsync: jest.fn().mockResolvedValue(user),
    })
    .compile();

  const app = moduleFixture.createNestApplication();
  const orm = moduleFixture.get(MikroORM);

  await orm.getSchemaGenerator().dropDatabase();
  await orm.getSchemaGenerator().createDatabase();
  await orm.getSchemaGenerator().createSchema();
  await app.init();

  return { app, orm };
}

export async function truncateTables(orm: MikroORM) {
  const generator = orm.getSchemaGenerator();
  await generator.clearDatabase();
}
