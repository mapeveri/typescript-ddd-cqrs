import { beforeAll, describe, beforeEach, afterAll, expect, it } from 'vitest';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MikroORM } from '@mikro-orm/core';
import { createApplication, truncateTables, USER_ID_LOGGED } from '@test/acceptance/createApplication';
import WordMother from '@test/unit/languages/domain/term/word/wordMother';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import { WordPrimitives } from '@src/languages/domain/term/word/word';
import { UserIdMother } from '@test/unit/account/domain/user/userIdMother';

describe('Get term feature', () => {
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

  describe('As a user I want to get a term', () => {
    const termId = TermIdMother.random().toString();
    let wordExpected: WordPrimitives;

    async function startScenario() {
      await truncateTables(orm);

      wordExpected = WordMother.random({
        id: TermIdMother.random(termId),
        likes: [],
        userId: UserIdMother.random(USER_ID_LOGGED),
      }).toPrimitives();

      const wordData = {
        countryId: wordExpected.countryId,
        languageId: wordExpected.languageId,
        terms: wordExpected.terms,
        id: wordExpected.id,
      };
      await request(app.getHttpServer()).post('/words').set('Authorization', 'Bearer mock-token').send(wordData);
    }

    beforeEach(startScenario);

    it('should return the term', async () => {
      const response = await request(app.getHttpServer())
        .get(`/terms/${termId}`)
        .set('Authorization', 'Bearer mock-token')
        .expect(200);

      expect(response.body).toEqual({
        id: wordExpected.id,
        countryId: wordExpected.countryId,
        userId: wordExpected.userId,
        languageId: wordExpected.languageId,
        likes: wordExpected.likes,
        terms: wordExpected.terms,
      });
    });
  });
});
