import { beforeEach, describe, expect, it } from '@jest/globals';
import { SearchTermQueryMother } from './searchTermQueryMother';
import SearchTermQueryHandler from '@src/languages/application/term/query/search/searchTermQueryHandler';
import { TermMother } from '@test/languages/domain/term/termMother';
import Term from '@src/languages/domain/term/term';
import { TermRepositoryMock } from '@test/languages/domain/term/termRepositoryMock';

describe('SearchTermQueryHandler handle', () => {
  let termRepository: TermRepositoryMock;
  let searchTermQueryHandler: SearchTermQueryHandler;

  beforeEach(() => {
    termRepository = new TermRepositoryMock();
    searchTermQueryHandler = new SearchTermQueryHandler(termRepository);
  });

  it('should search terms based on a term search', async () => {
    const termToSearch = 'Hello world';
    const query = SearchTermQueryMother.random(termToSearch);
    const term: Term = TermMother.random({ title: termToSearch });
    termRepository.search.mockReturnValueOnce(Promise.resolve([term]));

    const foundTerms = await searchTermQueryHandler.execute(query);

    termRepository.expectSearchCalledWith(termToSearch);
    expect(foundTerms.content).toEqual([term]);
  });
});
