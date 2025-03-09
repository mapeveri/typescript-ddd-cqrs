import { beforeAll, describe, beforeEach, afterAll, it, expect } from 'vitest';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MikroORM } from '@mikro-orm/core';
import { createApplication, truncateTables } from '@test/acceptance/createApplication';
import { UserPrimitives } from '@src/account/domain/user/user';
import { UserMother } from '@test/unit/account/domain/user/userMother';
import { UserIdMother } from '@test/unit/account/domain/user/userIdMother';

describe('Get user feature', () => {
  let app: INestApplication;
  let orm: MikroORM;

  const USER_ID = '4a4df157-8ab8-50af-bb39-88e8ce29eb16';
  const NAME = 'TEST';
  const EMAIL = 'test@test.com';
  const TOKEN = '1234';
  const PROVIDER = 'google';
  const PHOTO = 'www.photo.com/photo.png';
  const INTERESTS: string[] = [];

  const prepareApp = async () => {
    const setup = await createApplication();
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

  describe('As a user I want to get a user', () => {
    let userExpected: UserPrimitives;

    async function startScenario() {
      await truncateTables(orm);

      const user = UserMother.random({
        id: UserIdMother.random(USER_ID),
        name: NAME,
        interests: INTERESTS,
        email: EMAIL,
        photo: PHOTO,
        provider: PROVIDER,
      });

      userExpected = user.toPrimitives();
      await request(app.getHttpServer()).post('/auth/signup').set('Authorization', 'Bearer mock-token').send({
        name: userExpected.name,
        email: userExpected.email,
        token: TOKEN,
        provider: userExpected.provider,
        photo: userExpected.photo,
      });
    }

    beforeEach(startScenario);

    it('should return an empty object when it does not exists', async () => {
      await request(app.getHttpServer())
        .get('/users/a625816c-2117-44a6-a0ba-07fe54cb0ca3')
        .set('Authorization', 'Bearer mock-token')
        .expect(200)
        .expect({});
    });

    it('should return the user when it exists', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${USER_ID}`)
        .set('Authorization', 'Bearer mock-token')
        .expect(200);

      expect(response.body).toEqual({
        id: USER_ID,
        name: NAME,
        email: EMAIL,
        provider: PROVIDER,
        photo: PHOTO,
        interests: INTERESTS,
      });
    });
  });
});
