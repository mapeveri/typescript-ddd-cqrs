import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';
import SearchTermQuery from './searchTermQuery';
import SearchTermViewReadLayer, {
  SEARCH_TERM_VIEW_READ_LAYER,
  TermCriteriaParams,
} from '@src/languages/application/term/query/searchTermViewReadLayer';
import SearchTermResponse from './searchTermResponse';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { IQueryHandler, QueryHandler } from '@src/shared/domain/bus/queryBus/queryHandler';

@QueryHandler(SearchTermQuery)
export default class SearchTermQueryHandler implements IQueryHandler<SearchTermQuery> {
  constructor(@Inject(SEARCH_TERM_VIEW_READ_LAYER) private readonly searchTermViewReadLayer: SearchTermViewReadLayer) {}

  async execute(query: SearchTermQuery): Promise<QueryResponse> {
    const criteria: TermCriteriaParams = { term: query.term, size: query.size, page: query.page };
    if (query.orderBy && query.orderType) {
      criteria['orderBy'] = { key: query.orderBy, orderType: query.orderType };
    }

    const terms = await this.searchTermViewReadLayer.search(criteria);
    return SearchTermResponse.fromTerms(terms);
  }
}
