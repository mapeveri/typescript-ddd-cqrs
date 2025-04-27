import { ExpressionTermPrimitives } from '@src/language/domain/term/expression/expressionTerm';
import ExpressionTermCollection from '@src/language/domain/term/expression/expressionTermCollection';
import ExpressionTermMother from './expressionTermMother';

export default class ExpressionTermCollectionMother {
  static random(terms: Array<ExpressionTermPrimitives>): ExpressionTermCollection {
    return ExpressionTermCollection.of(terms ?? [ExpressionTermMother.random().toPrimitives()]);
  }
}
