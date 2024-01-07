import Term from '@src/languages/domain/term/term';
import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';

export default class FindSuggestionsTermQueryResponse extends QueryResponse {
  private constructor(terms: object) {
    super(terms);
  }

  static fromTerms(terms: Term[]): FindSuggestionsTermQueryResponse {
    return new FindSuggestionsTermQueryResponse(terms.map((term: Term) => term.toPrimitives()));
  }
}
