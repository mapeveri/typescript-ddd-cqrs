import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';
import SearchTermQuery from './searchTermQuery';
import SearchTermViewReadLayer, {
  SEARCH_TERM_VIEW_READ_LAYER,
} from '@src/languages/application/term/query/search/searchTermViewReadLayer';
import SearchTermResponse from './searchTermResponse';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { IQueryHandler, QueryHandler } from '@src/shared/domain/bus/queryBus/queryHandler';
import TermViewCriteria, { TermCriteriaParams } from '@src/languages/application/term/query/search/termViewCriteria';

@QueryHandler(SearchTermQuery)
export default class SearchTermQueryHandler implements IQueryHandler<SearchTermQuery> {
  constructor(@Inject(SEARCH_TERM_VIEW_READ_LAYER) private readonly termRepository: SearchTermViewReadLayer) {}

  async execute(query: SearchTermQuery): Promise<QueryResponse> {
    const criteria: TermCriteriaParams = { term: query.term, size: query.size, page: query.page };
    if (query.orderBy && query.orderType) {
      criteria['orderBy'] = { key: query.orderBy, orderType: query.orderType };
    }

    const terms = await this.termRepository.search(TermViewCriteria.from(criteria));
    return SearchTermResponse.fromTerms(terms);
  }
}
