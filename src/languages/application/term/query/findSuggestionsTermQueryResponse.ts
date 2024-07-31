import { TermView } from '@src/languages/application/term/query/view/termView';
import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';

export default class FindSuggestionsTermQueryResponse extends QueryResponse {
  private constructor(terms: TermView[]) {
    super(terms);
  }

  static fromTerms(terms: TermView[]): FindSuggestionsTermQueryResponse {
    return new FindSuggestionsTermQueryResponse(terms);
  }
}
