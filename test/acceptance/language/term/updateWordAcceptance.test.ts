import { beforeAll, describe, beforeEach, afterAll, it, expect } from 'vitest';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MikroORM } from '@mikro-orm/core';
import { createApplication, USER_ID_LOGGED } from '@test/acceptance/createApplication';
import WordMother from '@test/unit/language/domain/term/word/wordMother';
import { TermIdMother } from '@test/unit/language/domain/term/termIdMother';
import { CountryIdMother } from '@test/unit/language/domain/country/countryIdMother';
import WordTermCollectionMother from '@test/unit/language/domain/term/word/wordTermCollectionMother';
import { UserIdMother } from '@test/unit/account/domain/user/userIdMother';
import TermLike from '@src/language/domain/term/termLike';
import { WordTermPrimitives } from '@src/language/domain/term/word/wordTerm';

describe('Update word feature', () => {
  let app: INestApplication;
  let orm: MikroORM;

  const TERM_ID = '744112be-3b9d-4d70-a242-9b275a1ce041';
  const OLD_LANGUAGE_ID = 'ES';
  const NEW_LANGUAGE_ID = 'EN';
  const LIKES: TermLike[] = [];
  const OLD_TERMS: Array<WordTermPrimitives> = [];
  const NEW_TERMS = [
    {
      word: 'Word test',
      description: 'Description test',
      example: 'test',
      hashtags: [],
    },
  ];
  const OLD_COUNTRY_ID = 'a625816c-2117-44a6-a0ba-07fe54cb0cc3';
  const NEW_COUNTRY_ID = 'a625816c-2117-44a6-a0ba-07fe54cb0cc4';

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

  describe('As a user I want to update a word', () => {
    async function startScenario() {
      const word = WordMother.random({
        id: TermIdMother.random(TERM_ID),
        userId: UserIdMother.random(USER_ID_LOGGED),
        likes: LIKES,
        languageId: OLD_LANGUAGE_ID,
        terms: WordTermCollectionMother.random(OLD_TERMS),
        countryId: CountryIdMother.random(OLD_COUNTRY_ID),
      }).toPrimitives();

      await request(app.getHttpServer()).post('/words').set('Authorization', 'Bearer mock-token').send({
        countryId: word.countryId,
        languageId: word.languageId,
        terms: word.terms,
        id: TERM_ID,
      });
    }

    beforeEach(async () => {
      await startScenario();
    });

    it('should update all the values', async () => {
      const wordData = {
        countryId: NEW_COUNTRY_ID,
        languageId: NEW_LANGUAGE_ID,
        terms: WordTermCollectionMother.random(NEW_TERMS).toArray(),
      };

      await request(app.getHttpServer())
        .put(`/words/${TERM_ID}`)
        .set('Authorization', 'Bearer mock-token')
        .send(wordData)
        .expect(204);

      const response = await request(app.getHttpServer())
        .get(`/terms/${TERM_ID}`)
        .set('Authorization', 'Bearer mock-token')
        .expect(200);

      expect(response.body).toEqual({
        id: TERM_ID,
        countryId: NEW_COUNTRY_ID,
        userId: USER_ID_LOGGED,
        languageId: NEW_LANGUAGE_ID,
        likes: LIKES,
        terms: NEW_TERMS,
      });
    });
  });
});
