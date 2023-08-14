import { ExpressionTermPrimitives } from '@src/languages/domain/expression/valueObjects/expressionTerm';
import ExpressionTermCollection from '@src/languages/domain/expression/valueObjects/expressionTermCollection';
import ExpressionTermMother from './expressionTermMother';

export default class ExpressionTermCollectionMother {
  static random(terms: Array<ExpressionTermPrimitives>): ExpressionTermCollection {
    return ExpressionTermCollection.of(terms ?? [ExpressionTermMother.random().toPrimitives()]);
  }
}
