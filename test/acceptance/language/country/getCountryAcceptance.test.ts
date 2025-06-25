import { beforeAll, describe, beforeEach, it, expect, afterEach } from 'vitest';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MikroORM } from '@mikro-orm/core';
import { createApplication } from '@test/acceptance/createApplication';
import CountryMother from '@test/unit/language/domain/country/countryMother';
import { CountryIdMother } from '@test/unit/language/domain/country/countryIdMother';
import LanguageMother from '@test/unit/language/domain/country/languageMother';
import Country from '@src/language/domain/country/country';

describe('Get country feature', () => {
  let app: INestApplication;
  let orm: MikroORM;

  const COUNTRY_ID = 'e625816c-2117-44a6-a0ba-07fe54cb0cc4';
  const NAME = 'Spain';
  const ISO = 'ES';
  const LANGUAGE = {
    languageId: 'EN',
    name: 'Spanish',
  };

  const prepareApp = async () => {
    const setup = await createApplication();
    app = setup.app;
    orm = setup.ormLanguage;
  };

  beforeAll(async () => {
    await prepareApp();
  });

  describe('As a user I want to get a country', () => {
    let country: Country;

    async function startScenario() {
      country = CountryMother.random({
        id: CountryIdMother.random(COUNTRY_ID),
        name: NAME,
        iso: ISO,
        languages: [LanguageMother.random(LANGUAGE)],
      });

      const countryData = country.toPrimitives();
      await request(app.getHttpServer()).post('/countries').set('Authorization', 'Bearer mock-token').send(countryData);
    }

    beforeEach(async () => {
      await startScenario();
    });

    afterEach(() => {
      orm.em.nativeDelete(Country, country);
    });

    it('should return an empty object when it does not exists', async () => {
      await request(app.getHttpServer())
        .get('/countries/a625816c-2117-44a6-a0ba-07fe54cb0ca3')
        .set('Authorization', 'Bearer mock-token')
        .expect(200)
        .expect({});
    });

    it('should return the country when it exists', async () => {
      const response = await request(app.getHttpServer())
        .get(`/countries/${COUNTRY_ID}`)
        .set('Authorization', 'Bearer mock-token')
        .expect(200);

      expect(response.body).toEqual({
        id: COUNTRY_ID,
        name: NAME,
        languages: [LANGUAGE],
        iso: ISO,
      });
    });
  });
});
