import { beforeAll, describe, it } from 'vitest';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createApplication } from '@test/acceptance/createApplication';

describe('Sign up feature', () => {
  let app: INestApplication;

  const prepareApp = async () => {
    const setup = await createApplication();
    app = setup.app;
  };

  beforeAll(async () => {
    await prepareApp();
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
