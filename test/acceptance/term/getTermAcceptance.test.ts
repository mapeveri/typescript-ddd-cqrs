import { beforeAll, describe, beforeEach, afterAll, it } from '@jest/globals';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { MikroORM } from '@mikro-orm/core';
import { createApplication, truncateTables } from '@test/acceptance/createApplication';
import WordMother from '@test/unit/languages/domain/term/word/wordMother';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';

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

    async function startScenario() {
      await truncateTables(orm);

      const word = WordMother.random({ id: TermIdMother.random(termId) }).toPrimitives();
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
      await request(app.getHttpServer()).get(`/term/${termId}`).set('Authorization', 'Bearer mock-token').expect(200);
    });
  });
});
