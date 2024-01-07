import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';
import SearchTermQuery from './searchTermQuery';
import TermRepository, { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import SearchTermResponse from './searchTermResponse';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { IQueryHandler, QueryHandler } from '@src/shared/domain/bus/queryBus/queryHandler';
import TermCriteria from '@src/languages/domain/term/termCriteria';

@QueryHandler(SearchTermQuery)
export default class SearchTermQueryHandler implements IQueryHandler<SearchTermQuery> {
  constructor(@Inject(TERM_REPOSITORY) private readonly termRepository: TermRepository) {}

  async execute(query: SearchTermQuery): Promise<QueryResponse> {
    const terms = await this.termRepository.search(TermCriteria.from({ term: query.term }));
    return SearchTermResponse.fromTerms(terms);
  }
}
