import { TermView } from '@src/language/application/term/query/termView';
import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';

export default class FindSuggestionsTermQueryResponse extends QueryResponse {
  private constructor(terms: TermView[]) {
    super(terms);
  }

  static fromTerms(terms: TermView[]): FindSuggestionsTermQueryResponse {
    return new FindSuggestionsTermQueryResponse(terms);
  }
}
