import TermView from '@src/languages/application/term/viewModel/termView';
import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';

export default class FindSuggestionsTermQueryResponse extends QueryResponse {
  private constructor(terms: object) {
    super(terms);
  }

  static fromTerms(terms: TermView[]): FindSuggestionsTermQueryResponse {
    return new FindSuggestionsTermQueryResponse(terms.map((term: TermView) => term.toPrimitives()));
  }
}
