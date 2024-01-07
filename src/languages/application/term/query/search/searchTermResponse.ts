import Term from '@src/languages/domain/term/term';
import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';

export default class SearchTermResponse extends QueryResponse {
  private constructor(terms: object) {
    super(terms);
  }

  static fromTerms(terms: Term[]): SearchTermResponse {
    return new SearchTermResponse(terms.map((term: Term) => term.toPrimitives()));
  }
}
