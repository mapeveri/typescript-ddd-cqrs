import { beforeEach, describe, expect, it } from '@jest/globals';
import { TermMother } from '@test/languages/domain/term/termMother';
import FindSuggestionsTermQueryHandler from '@src/languages/application/term/query/suggestion/findSuggestionsTermQueryHandler';
import { FindSuggestionsTermQueryMother } from '@test/languages/application/term/suggestion/findSuggestionsTermQueryMother';
import { FindSuggestionsTermReadLayerMock } from '@test/languages/application/term/suggestion/findSuggestionsTermReadLayerMock';

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
      const term = TermMother.random();
      findSuggestionTermReadLayerMock.add(term);

      const foundSuggestionsTerm = await findSuggestionsTermQueryHandler.execute(query);

      expect(foundSuggestionsTerm.content).toEqual([term.toPrimitives()]);
    });
  });
});