import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';
import { WordPrimitives } from '@src/languages/domain/term/word/word';
import { ExpressionPrimitives } from '@src/languages/domain/term/expression/expression';

export default class FindTermQueryResponse extends QueryResponse {
  private constructor(term: WordPrimitives | ExpressionPrimitives) {
    super(term);
  }

  static fromTerm(term: WordPrimitives | ExpressionPrimitives): FindTermQueryResponse {
    return new FindTermQueryResponse(term);
  }
}
