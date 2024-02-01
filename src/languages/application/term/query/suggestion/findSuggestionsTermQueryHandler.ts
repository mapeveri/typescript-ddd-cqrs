import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';
import FindSuggestionsTermQueryResponse from '@src/languages/application/term/query/suggestion/findSuggestionsTermQueryResponse';
import { IQueryHandler, QueryHandler } from '@src/shared/domain/bus/queryBus/queryHandler';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import FindSuggestionsTermQuery from '@src/languages/application/term/query/suggestion/findSuggestionsTermQuery';
import FindSuggestionsTermReadLayer, {
  FIND_SUGGESTIONS_TERM_READ_LAYER,
} from '@src/languages/application/term/query/suggestion/findSuggestionsTermReadLayer';
import UserId from '@src/languages/domain/user/userId';

@QueryHandler(FindSuggestionsTermQuery)
export default class FindSuggestionsTermQueryHandler implements IQueryHandler<FindSuggestionsTermQuery> {
  constructor(
    @Inject(FIND_SUGGESTIONS_TERM_READ_LAYER)
    private readonly findSuggestionTermReadLayer: FindSuggestionsTermReadLayer,
  ) {}

  async execute(query: FindSuggestionsTermQuery): Promise<QueryResponse> {
    const user = UserId.of(query.userId);
    const terms = await this.findSuggestionTermReadLayer.find(user);
    return FindSuggestionsTermQueryResponse.fromTerms(terms);
  }
}
