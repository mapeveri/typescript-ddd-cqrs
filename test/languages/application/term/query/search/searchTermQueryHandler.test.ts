import { beforeEach, describe, expect, it } from '@jest/globals';
import { SearchTermQueryMother } from './searchTermQueryMother';
import SearchTermQueryHandler from '@src/languages/application/term/query/search/searchTermQueryHandler';
import { TermMother } from '@test/languages/domain/term/termMother';
import Term from '@src/languages/domain/term/term';
import { TermRepositoryMock } from '@test/languages/domain/term/termRepositoryMock';

describe('SearchTermQueryHandler', () => {
  let termRepository: TermRepositoryMock;
  let searchTermQueryHandler: SearchTermQueryHandler;

  beforeEach(() => {
    termRepository = new TermRepositoryMock();
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
      const query = SearchTermQueryMother.random({ term: termToSearch });
      const term: Term = TermMother.random({ title: termToSearch });
      termRepository.add(term);

      const foundTerms = await searchTermQueryHandler.execute(query);

      expect(foundTerms.content).toEqual([
        {
          id: term.id,
          title: term.title,
          description: term.description,
          example: term.example,
          type: term.type.value,
          hashtags: term.hashtags,
          totalLikes: term.totalLikes,
        },
      ]);
    });
  });
});
