import { beforeAll, describe, beforeEach, afterAll, expect, it } from 'vitest';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MikroORM } from '@mikro-orm/core';
import { createApplication, USER_ID_LOGGED } from '@test/acceptance/createApplication';
import WordMother from '@test/unit/language/domain/term/word/wordMother';
import { TermIdMother } from '@test/unit/language/domain/term/termIdMother';
import { UserIdMother } from '@test/unit/account/domain/user/userIdMother';
import { CountryIdMother } from '@test/unit/language/domain/country/countryIdMother';
import TermLike from '@src/language/domain/term/termLike';
import WordTermCollectionMother from '@test/unit/language/domain/term/word/wordTermCollectionMother';
import { WordTermPrimitives } from '@src/language/domain/term/word/wordTerm';
import { MIKRO_ORM_CONTEXT_NAME } from '@src/language/mikroOrmConfig';

describe('Get term feature', () => {
  let app: INestApplication;
  let orm: MikroORM;
  const TERM_ID = 'aa1d4185-7bc4-4b8a-8c70-6d16408fa1e4';
  const COUNTRY_ID = 'e625816c-2117-44a6-a0ba-07fe54cb0cc4';
  const LANGUAGE_ID = 'ES';
  const LIKES: TermLike[] = [];
  const TERMS: Array<WordTermPrimitives> = [];

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

  describe('As a user I want to get a term', () => {
    async function startScenario() {
      const wordExpected = WordMother.random({
        id: TermIdMother.random(TERM_ID),
        likes: LIKES,
        countryId: CountryIdMother.random(COUNTRY_ID),
        userId: UserIdMother.random(USER_ID_LOGGED),
        languageId: LANGUAGE_ID,
        terms: WordTermCollectionMother.random(TERMS),
      }).toPrimitives();

      const wordData = {
        countryId: wordExpected.countryId,
        languageId: wordExpected.languageId,
        terms: wordExpected.terms,
        id: wordExpected.id,
      };

      await request(app.getHttpServer()).post('/words').set('Authorization', 'Bearer mock-token').send(wordData);
    }

    beforeEach(async () => {
      await startScenario();
    });

    it('should return the term', async () => {
      const response = await request(app.getHttpServer())
        .get(`/terms/${TERM_ID}`)
        .set('Authorization', 'Bearer mock-token')
        .expect(200);

      expect(response.body).toEqual({
        id: TERM_ID,
        countryId: COUNTRY_ID,
        userId: USER_ID_LOGGED,
        languageId: LANGUAGE_ID,
        likes: LIKES,
        terms: TERMS,
      });
    });
  });
});
