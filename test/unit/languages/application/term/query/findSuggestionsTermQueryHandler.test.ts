import { beforeEach, beforeAll, describe, expect, it } from '@jest/globals';
import { FindSuggestionsTermReadLayerMock } from '@test/unit/languages/application/term/query/findSuggestionsTermReadLayerMock';
import FindSuggestionsTermQueryHandler from '@src/languages/application/term/query/findSuggestionsTermQueryHandler';
import { FindSuggestionsTermQueryMother } from '@test/unit/languages/application/term/query/findSuggestionsTermQueryMother';
import { TermViewMother } from '@test/unit/languages/application/term/query/view/termViewMother';
import FindSuggestionsTermQuery from '@src/languages/application/term/query/findSuggestionsTermQuery';
import { TermView } from '@src/languages/application/term/query/view/termView';

describe('Given a FindSuggestionsTermQueryHandler', () => {
  let findSuggestionTermReadLayer: FindSuggestionsTermReadLayerMock;
  let handler: FindSuggestionsTermQueryHandler;

  const prepareDependencies = () => {
    findSuggestionTermReadLayer = new FindSuggestionsTermReadLayerMock();
  };

  const initHandler = () => {
    handler = new FindSuggestionsTermQueryHandler(findSuggestionTermReadLayer);
  };

  const clean = () => {
    findSuggestionTermReadLayer.clean();
  };

  beforeAll(() => {
    prepareDependencies();
    initHandler();
  });

  beforeEach(() => {
    clean();
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
      findSuggestionTermReadLayer.add(term);
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
