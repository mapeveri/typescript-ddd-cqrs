import { beforeEach, describe, expect, it } from '@jest/globals';
import { SearchTermQueryMother } from './searchTermQueryMother';
import SearchTermQueryHandler from '@src/languages/application/term/query/searchTermQueryHandler';
import { SearchTermViewReadLayerMock } from '@test/unit/languages/application/term/query/searchTermViewReadLayerMock';
import { TermView } from '@src/languages/application/term/view/termView';
import { TermViewMother } from '@test/unit/languages/application/term/view/termViewMother';

describe('SearchTermQueryHandler', () => {
  let termRepository: SearchTermViewReadLayerMock;
  let searchTermQueryHandler: SearchTermQueryHandler;

  beforeEach(() => {
    termRepository = new SearchTermViewReadLayerMock();
    searchTermQueryHandler = new SearchTermQueryHandler(termRepository);
  });

  describe('execute', () => {
    it('should get an empty result when no terms', async () => {
      const query = SearchTermQueryMother.random({});

      const foundTerms = await searchTermQueryHandler.execute(query);

      expect(foundTerms.content).toEqual([]);
    });

    it('should search terms based on a term search', async () => {
      const termToSearch = 'Hello world';
      const query = SearchTermQueryMother.random({
        term: termToSearch,
        page: 1,
        size: 5,
        orderBy: 'createdAt',
        orderType: 'desc',
      });
      const term: TermView = TermViewMother.random({ title: termToSearch });
      termRepository.add(term);

      const foundTerms = await searchTermQueryHandler.execute(query);

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
