import TermView from '@src/languages/application/term/viewModel/termView';
import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';

export default class SearchTermResponse extends QueryResponse {
  private constructor(terms: object) {
    super(terms);
  }

  static fromTerms(terms: TermView[]): SearchTermResponse {
    return new SearchTermResponse(terms.map((term: TermView) => term.toPrimitives()));
  }
}
