import { beforeAll, describe, beforeEach, afterAll, it } from '@jest/globals';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { MikroORM } from '@mikro-orm/core';
import { createApplication, truncateTables } from '@test/acceptance/createApplication';
import { UserPrimitives } from '@src/languages/domain/user/user';
import { UserMother } from '@test/unit/languages/domain/user/userMother';
import { UserIdMother } from '@test/unit/languages/domain/user/userIdMother';

describe('Get user feature', () => {
  let app: INestApplication;
  let orm: MikroORM;

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
    let userData: UserPrimitives;
    const userId = '4a4df157-8ab8-50af-bb39-88e8ce29eb16';

    async function startScenario() {
      await truncateTables(orm);

      const user = UserMother.random({ id: UserIdMother.random(userId), interests: [], email: 'test@test.com' });

      userData = user.toPrimitives();
      await request(app.getHttpServer()).post('/auth/signup').set('Authorization', 'Bearer mock-token').send({
        name: userData.name,
        email: userData.email,
        token: '1234',
        provider: userData.provider,
        photo: userData.photo,
      });
    }

    beforeEach(startScenario);

    it('should return an empty object when it does not exists', async () => {
      await request(app.getHttpServer())
        .get('/countries/a625816c-2117-44a6-a0ba-07fe54cb0ca3')
        .set('Authorization', 'Bearer mock-token')
        .expect(200)
        .expect({});
    });

    it('should return the country when it exists', async () => {
      await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .set('Authorization', 'Bearer mock-token')
        .expect(200)
        .expect(userData);
    });
  });
});
