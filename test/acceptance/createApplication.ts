import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MikroORM } from '@mikro-orm/core';
import { AppModule } from '@src/app.module';

export async function createApplication() {
  const user = { userId: 'test-user-id' } as never;

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.test' }), AppModule],
  })
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
