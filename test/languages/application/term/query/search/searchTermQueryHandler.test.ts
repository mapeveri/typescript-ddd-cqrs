import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { SearchTermQueryMother } from './searchTermQueryMother';
import SearchTermQueryHandler from '@src/languages/application/term/query/search/searchTermQueryHandler';
import { TermMother } from '@test/languages/domain/term/termMother';
import Term from '@src/languages/domain/term/term';
import TermRepository from '@src/languages/domain/term/termRepository';
import { TermRepositoryMock } from '@test/languages/domain/term/termRepositoryMock';

describe('SearchTermQueryHandler handle', () => {
  let termRepository: TermRepository;
  let searchTermQueryHandler: SearchTermQueryHandler;

  beforeEach(() => {
    termRepository = TermRepositoryMock;
    searchTermQueryHandler = new SearchTermQueryHandler(termRepository);
  });

  it('should search terms based on a term search', async () => {
    const termToSearch = 'Hello world';
    const query = SearchTermQueryMother.random(termToSearch);
    const term: Term = TermMother.random({ title: termToSearch });
    const searchSpy = jest.spyOn(termRepository, 'search').mockReturnValue(Promise.resolve([term]));

    const foundTerms = await searchTermQueryHandler.handle(query);

    expect(searchSpy).toHaveBeenCalledWith(termToSearch);
    expect(foundTerms.content).toEqual([term]);
    searchSpy.mockRestore();
  });
});
