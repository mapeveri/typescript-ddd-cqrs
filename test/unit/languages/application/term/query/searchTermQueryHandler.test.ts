import { beforeEach, beforeAll, describe, expect, it } from '@jest/globals';
import { SearchTermQueryMother } from './searchTermQueryMother';
import SearchTermQueryHandler from '@src/languages/application/term/query/searchTermQueryHandler';
import { SearchTermViewReadLayerMock } from '@test/unit/languages/application/term/query/searchTermViewReadLayerMock';
import { TermView } from '@src/languages/application/term/query/termView';
import { TermViewMother } from '@test/unit/languages/application/term/query/termViewMother';
import SearchTermQuery from '@src/languages/application/term/query/searchTermQuery';

describe('Given a SearchTermQueryHandler to handle', () => {
  let searchTermViewReadLayer: SearchTermViewReadLayerMock;
  let handler: SearchTermQueryHandler;

  const prepareDependencies = () => {
    searchTermViewReadLayer = new SearchTermViewReadLayerMock();
  };

  const initHandler = () => {
    handler = new SearchTermQueryHandler(searchTermViewReadLayer);
  };

  const clean = () => {
    searchTermViewReadLayer.clean();
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
      const query = SearchTermQueryMother.random({});

      const foundTerms = await handler.execute(query);

      expect(foundTerms.content).toEqual([]);
    });
  });

  describe('When there are terms', () => {
    let query: SearchTermQuery;
    let term: TermView;

    function startScenario() {
      const termToSearch = 'Hello world';
      query = SearchTermQueryMother.random({
        term: termToSearch,
        page: 1,
        size: 5,
        orderBy: 'createdAt',
        orderType: 'desc',
      });

      term = TermViewMother.random({ title: termToSearch });
      searchTermViewReadLayer.add(term);
    }

    beforeEach(startScenario);

    it('should search terms based on a term search', async () => {
      const foundTerms = await handler.execute(query);

      expect(foundTerms.content).toEqual([
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
