import { beforeEach, beforeAll, describe, expect, it } from 'vitest';
import { SearchTermQueryMother } from './searchTermQueryMother';
import SearchTermQueryHandler from '@src/language/application/term/query/searchTermQueryHandler';
import { SearchTermViewReadModelMock } from '@test/unit/language/application/term/query/searchTermViewReadModelMock';
import { TermView } from '@src/language/application/term/query/termView';
import { TermViewMother } from '@test/unit/language/application/term/query/termViewMother';
import SearchTermQuery from '@src/language/application/term/query/searchTermQuery';

describe('Given a SearchTermQueryHandler to handle', () => {
  let searchTermViewReadModel: SearchTermViewReadModelMock;
  let handler: SearchTermQueryHandler;

  const prepareDependencies = () => {
    searchTermViewReadModel = new SearchTermViewReadModelMock();
  };

  const initHandler = () => {
    handler = new SearchTermQueryHandler(searchTermViewReadModel);
  };

  const clean = () => {
    searchTermViewReadModel.clean();
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
      searchTermViewReadModel.add(term);
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
