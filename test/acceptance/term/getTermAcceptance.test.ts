import { beforeAll, describe, beforeEach, afterAll, expect, it } from '@jest/globals';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { MikroORM } from '@mikro-orm/core';
import { createApplication, truncateTables } from '@test/acceptance/createApplication';
import WordMother from '@test/unit/languages/domain/term/word/wordMother';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import { WordPrimitives } from '@src/languages/domain/term/word/word';

describe('Given a TermGetController to handle', () => {
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
    let word: WordPrimitives;

    async function startScenario() {
      await truncateTables(orm);

      word = WordMother.random({ id: TermIdMother.random(termId) }).toPrimitives();
      const wordData = {
        countryId: word.countryId,
        languageId: word.languageId,
        terms: word.terms,
        id: word.id,
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
        ...word,
      });
    });
  });
});
