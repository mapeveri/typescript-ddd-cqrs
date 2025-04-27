import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';
import { WordPrimitives } from '@src/language/domain/term/word/word';
import { ExpressionPrimitives } from '@src/language/domain/term/expression/expression';

export default class FindTermQueryResponse extends QueryResponse {
  private constructor(term: WordPrimitives | ExpressionPrimitives) {
    super(term);
  }

  static fromTerm(term: WordPrimitives | ExpressionPrimitives): FindTermQueryResponse {
    return new FindTermQueryResponse(term);
  }
}
