import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';
import FindSuggestionsTermQueryResponse from '@src/languages/application/term/query/findSuggestionsTermQueryResponse';
import { IQueryHandler, QueryHandler } from '@src/shared/domain/bus/queryBus/queryHandler';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import FindSuggestionsTermQuery from '@src/languages/application/term/query/findSuggestionsTermQuery';
import FindSuggestionsTermReadModel, {
  FIND_SUGGESTIONS_TERM_READ_MODEL,
} from '@src/languages/application/term/query/findSuggestionsTermReadModel';
import UserId from '@src/languages/domain/user/userId';

@QueryHandler(FindSuggestionsTermQuery)
export default class FindSuggestionsTermQueryHandler implements IQueryHandler<FindSuggestionsTermQuery> {
  constructor(
    @Inject(FIND_SUGGESTIONS_TERM_READ_MODEL)
    private readonly findSuggestionTermReadModel: FindSuggestionsTermReadModel,
  ) {}

  async execute(query: FindSuggestionsTermQuery): Promise<QueryResponse> {
    const user = UserId.of(query.userId);
    const terms = await this.findSuggestionTermReadModel.find(user);
    return FindSuggestionsTermQueryResponse.fromTerms(terms);
  }
}
