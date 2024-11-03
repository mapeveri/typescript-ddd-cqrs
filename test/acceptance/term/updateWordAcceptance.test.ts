import { beforeAll, describe, beforeEach, afterAll, it } from '@jest/globals';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { MikroORM } from '@mikro-orm/core';
import { createApplication, truncateTables } from '@test/acceptance/createApplication';
import WordMother from '@test/unit/languages/domain/term/word/wordMother';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import { CountryIdMother } from '@test/unit/languages/domain/country/countryIdMother';
import WordTermMother from '@test/unit/languages/domain/term/word/wordTermMother';
import WordTermCollectionMother from '@test/unit/languages/domain/term/word/wordTermCollectionMother';

describe('Given a WordPutController to handle', () => {
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
    let wordData;

    async function startScenario() {
      await truncateTables(orm);

      const word = WordMother.random({ id: TermIdMother.random(wordId) }).toPrimitives();

      wordData = {
        countryId: word.countryId,
        languageId: word.languageId,
        terms: word.terms,
        id: word.id,
      };
      await request(app.getHttpServer()).post('/words').set('Authorization', 'Bearer mock-token').send(wordData);
    }

    beforeEach(startScenario);

    it('should update all the values', async () => {
      wordData = {
        countryId: CountryIdMother.random().toString(),
        languageId: 'EN',
        terms: WordTermCollectionMother.random([WordTermMother.random().toPrimitives()]).toArray(),
      };

      await request(app.getHttpServer())
        .put(`/words/${wordId}`)
        .set('Authorization', 'Bearer mock-token')
        .send(wordData)
        .expect(204);
    });
  });
});
