import { beforeAll, describe, beforeEach, afterAll, it } from '@jest/globals';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { MikroORM } from '@mikro-orm/core';
import { createApplication, truncateTables } from '@test/acceptance/createApplication';
import CountryMother from '@test/unit/languages/domain/country/countryMother';
import { CountryPrimitives } from '@src/languages/domain/country/country';
import { CountryIdMother } from '@test/unit/languages/domain/country/countryIdMother';

describe('Get country feature', () => {
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
    const countryId = 'e625816c-2117-44a6-a0ba-07fe54cb0cc4';

    async function startScenario() {
      await truncateTables(orm);

      const country = CountryMother.random({ id: CountryIdMother.random(countryId) });

      countryData = country.toPrimitives();
      await request(app.getHttpServer()).post('/countries').set('Authorization', 'Bearer mock-token').send(countryData);
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
        .get(`/countries/${countryId}`)
        .set('Authorization', 'Bearer mock-token')
        .expect(200)
        .expect(countryData);
    });
  });
});
