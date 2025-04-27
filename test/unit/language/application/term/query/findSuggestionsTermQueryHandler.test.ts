import { beforeEach, beforeAll, describe, expect, it } from 'vitest';
import { FindSuggestionsTermReadModelMock } from '@test/unit/language/application/term/query/findSuggestionsTermReadModelMock';
import FindSuggestionsTermQueryHandler from '@src/language/application/term/query/findSuggestionsTermQueryHandler';
import { FindSuggestionsTermQueryMother } from '@test/unit/language/application/term/query/findSuggestionsTermQueryMother';
import { TermViewMother } from '@test/unit/language/application/term/query/termViewMother';
import FindSuggestionsTermQuery from '@src/language/application/term/query/findSuggestionsTermQuery';
import { TermView } from '@src/language/application/term/query/termView';
import InvalidArgumentException from '@src/shared/domain/exceptions/invalidArgumentException';

describe('Given a FindSuggestionsTermQueryHandler to handle', () => {
  let findSuggestionTermReadModel: FindSuggestionsTermReadModelMock;
  let handler: FindSuggestionsTermQueryHandler;

  const prepareDependencies = () => {
    findSuggestionTermReadModel = new FindSuggestionsTermReadModelMock();
  };

  const initHandler = () => {
    handler = new FindSuggestionsTermQueryHandler(findSuggestionTermReadModel);
  };

  const clean = () => {
    findSuggestionTermReadModel.clean();
  };

  beforeAll(() => {
    prepareDependencies();
    initHandler();
  });

  beforeEach(() => {
    clean();
  });

  describe('When user id is invalid', () => {
    let query: FindSuggestionsTermQuery;

    function startScenario() {
      query = FindSuggestionsTermQueryMother.random('');
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(query)).rejects.toThrowError(InvalidArgumentException);
    });
  });

  describe('When no terms', () => {
    it('should get an empty result', async () => {
      const query = FindSuggestionsTermQueryMother.random();

      const foundSuggestionsTerm = await handler.execute(query);

      expect(foundSuggestionsTerm.content).toEqual([]);
    });
  });

  describe('Where there are terms', () => {
    let query: FindSuggestionsTermQuery;
    let term: TermView;

    function startScenario() {
      query = FindSuggestionsTermQueryMother.random();
      term = TermViewMother.random();
      findSuggestionTermReadModel.add(term);
    }

    beforeEach(startScenario);

    it('should search suggestion term based on what the user wants to learn', async () => {
      const foundSuggestionsTerm = await handler.execute(query);

      expect(foundSuggestionsTerm.content).toEqual([
        {
          id: term.id,
          title: term.title,
          description: term.description,
          example: term.example,
          type: term.type,
          hashtags: term.hashtags,
          totalLikes: term.totalLikes,
          likes: term.likes,
          createdAt: term.createdAt,
        },
      ]);
    });
  });
});
