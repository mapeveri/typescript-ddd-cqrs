import { beforeAll, describe, afterAll, it } from 'vitest';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MikroORM } from '@mikro-orm/core';
import { createApplication } from '@test/acceptance/createApplication';
import { MIKRO_ORM_CONTEXT_NAME } from '@src/account/mikroOrmConfig';

describe('Sign up feature', () => {
  let app: INestApplication;
  let orm: MikroORM;

  const prepareApp = async () => {
    const setup = await createApplication(MIKRO_ORM_CONTEXT_NAME);
    app = setup.app;
    orm = setup.orm;
  };

  const closeApp = async () => {
    await orm.close(true);
    await app.close();
  };

  beforeAll(async () => {
    await prepareApp();
  });

  afterAll(async () => {
    await closeApp();
  });

  describe('As a user I want to signUp in the app', () => {
    it('should create the user', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .set('Authorization', 'Bearer mock-token')
        .send({
          email: 'test@test.com',
          name: 'test',
          token: '123',
          provider: 'google',
          photo: '',
        })
        .expect(201);
    });
  });
});
