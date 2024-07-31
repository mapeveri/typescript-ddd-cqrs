import { beforeEach, describe, expect, it } from '@jest/globals';
import { FindSuggestionsTermReadLayerMock } from '@test/unit/languages/application/term/query/findSuggestionsTermReadLayerMock';
import FindSuggestionsTermQueryHandler from '@src/languages/application/term/query/findSuggestionsTermQueryHandler';
import { FindSuggestionsTermQueryMother } from '@test/unit/languages/application/term/query/findSuggestionsTermQueryMother';
import { TermViewMother } from '@test/unit/languages/application/term/query/view/termViewMother';

describe('FindSuggestionsTermQueryHandler', () => {
  let findSuggestionTermReadLayerMock: FindSuggestionsTermReadLayerMock;
  let findSuggestionsTermQueryHandler: FindSuggestionsTermQueryHandler;

  beforeEach(() => {
    findSuggestionTermReadLayerMock = new FindSuggestionsTermReadLayerMock();
    findSuggestionsTermQueryHandler = new FindSuggestionsTermQueryHandler(findSuggestionTermReadLayerMock);
  });

  describe('execute', () => {
    it('should get an empty result when no suggestion found', async () => {
      const query = FindSuggestionsTermQueryMother.random();

      const foundSuggestionsTerm = await findSuggestionsTermQueryHandler.execute(query);

      expect(foundSuggestionsTerm.content).toEqual([]);
    });

    it('should search suggestion term based on what the user wants to learn', async () => {
      const query = FindSuggestionsTermQueryMother.random();
      const term = TermViewMother.random();
      findSuggestionTermReadLayerMock.add(term);

      const foundSuggestionsTerm = await findSuggestionsTermQueryHandler.execute(query);

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
