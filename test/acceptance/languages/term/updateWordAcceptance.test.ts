import { beforeAll, describe, beforeEach, afterAll, it, expect } from 'vitest';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { MikroORM } from '@mikro-orm/core';
import { createApplication, truncateTables, USER_ID_LOGGED } from '@test/acceptance/createApplication';
import WordMother from '@test/unit/languages/domain/term/word/wordMother';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import { CountryIdMother } from '@test/unit/languages/domain/country/countryIdMother';
import WordTermMother from '@test/unit/languages/domain/term/word/wordTermMother';
import WordTermCollectionMother from '@test/unit/languages/domain/term/word/wordTermCollectionMother';
import { UserIdMother } from '@test/unit/account/domain/user/userIdMother';

describe('Update word feature', () => {
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

  describe('As a user I want to update a word', () => {
    const wordId = TermIdMother.random().toString();

    async function startScenario() {
      await truncateTables(orm);

      const word = WordMother.random({
        id: TermIdMother.random(wordId),
        userId: UserIdMother.random(USER_ID_LOGGED),
      }).toPrimitives();

      await request(app.getHttpServer()).post('/words').set('Authorization', 'Bearer mock-token').send({
        countryId: word.countryId,
        languageId: word.languageId,
        terms: word.terms,
        id: word.id,
      });
    }

    beforeEach(startScenario);

    it('should update all the values', async () => {
      const wordData = {
        countryId: CountryIdMother.random().toString(),
        languageId: 'EN',
        terms: WordTermCollectionMother.random([WordTermMother.random().toPrimitives()]).toArray(),
      };

      await request(app.getHttpServer())
        .put(`/words/${wordId}`)
        .set('Authorization', 'Bearer mock-token')
        .send(wordData)
        .expect(204);

      const response = await request(app.getHttpServer())
        .get(`/terms/${wordId}`)
        .set('Authorization', 'Bearer mock-token')
        .expect(200);

      expect(response.body).toEqual({
        id: wordId,
        countryId: wordData.countryId,
        userId: USER_ID_LOGGED,
        languageId: wordData.languageId,
        likes: [],
        terms: wordData.terms,
      });
    });
  });
});
