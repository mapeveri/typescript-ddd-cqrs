import { beforeAll, describe, afterAll, it } from '@jest/globals';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { MikroORM } from '@mikro-orm/core';
import { createApplication } from '@test/acceptance/createApplication';
import CountryMother from '@test/unit/languages/domain/country/countryMother';
import { CountryPrimitives } from '@src/languages/domain/country/country';

describe('Given a CountryGetController to handle', () => {
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

  describe('As a user I want to get a country', () => {
    let countryData: CountryPrimitives;

    async function startScenario() {
      const country = CountryMother.random();

      countryData = country.toPrimitives();
      await request(app.getHttpServer()).post('/countries').set('Authorization', 'Bearer mock-token').send(countryData);
    }

    beforeAll(startScenario);

    it('should return an empty object when it does not exists', async () => {
      await request(app.getHttpServer())
        .get('/countries/e625816c-2117-44a6-a0ba-07fe54cb0cc4')
        .set('Authorization', 'Bearer mock-token')
        .expect(200)
        .expect({});
    });

    it('should return the country when it exists', async () => {
      await request(app.getHttpServer())
        .get(`/countries/${countryData.id}`)
        .set('Authorization', 'Bearer mock-token')
        .expect(200)
        .expect(countryData);
    });
  });
});
