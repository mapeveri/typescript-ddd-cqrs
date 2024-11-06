import { beforeEach, beforeAll, describe, expect, it } from '@jest/globals';
import FindTermQueryHandler from '@src/languages/application/term/query/findTermQueryHandler';
import FindTermQuery from '@src/languages/application/term/query/findTermQuery';
import { FindTermQueryMother } from '@test/unit/languages/application/term/query/findTermQueryMother';
import InvalidArgumentException from '@src/shared/domain/exceptions/invalidArgumentException';
import TermDoesNotExistsException from '@src/languages/domain/term/termDoesNotExistsException';
import { TermRepositoryMock } from '@test/unit/languages/domain/term/termRepositoryMock';
import { WordPrimitives } from '@src/languages/domain/term/word/word';
import WordMother from '@test/unit/languages/domain/term/word/wordMother';

describe('Given a FindTermQueryHandler to handle', () => {
  let termRepository: TermRepositoryMock;
  let handler: FindTermQueryHandler;

  const prepareDependencies = () => {
    termRepository = new TermRepositoryMock();
  };

  const initHandler = () => {
    handler = new FindTermQueryHandler(termRepository);
  };

  const clean = () => {
    termRepository.clean();
  };

  beforeAll(() => {
    prepareDependencies();
    initHandler();
  });

  beforeEach(() => {
    clean();
  });

  describe('When id is invalid', () => {
    let query: FindTermQuery;

    function startScenario() {
      query = FindTermQueryMother.random('');
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(query)).rejects.toThrowError(InvalidArgumentException);
    });
  });

  describe('When the term does not exists', () => {
    let query: FindTermQuery;

    function startScenario() {
      query = FindTermQueryMother.random();
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(query)).rejects.toThrowError(TermDoesNotExistsException);
    });
  });

  describe('When the term exists', () => {
    let query: FindTermQuery;
    let wordExpected: WordPrimitives;

    function startScenario() {
      const word = WordMother.random();
      wordExpected = word.toPrimitives();
      query = FindTermQueryMother.random(word.getId().toString());

      termRepository.add(word);
    }

    beforeEach(startScenario);

    it('then should get the term', async () => {
      const response = await handler.execute(query);

      expect(response.content).toEqual({
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
