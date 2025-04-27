import { JsonType } from '@mikro-orm/core';
import { ExpressionTermPrimitives } from '@src/language/domain/term/expression/expressionTerm';
import ExpressionTermCollection from '@src/language/domain/term/expression/expressionTermCollection';

export class ExpressionTermCollectionType extends JsonType {
  convertToDatabaseValue(value: ExpressionTermCollection): string {
    if (!value) {
      return '[]';
    }

    return JSON.stringify(value.toArray());
  }

  convertToJSValue(value: ExpressionTermPrimitives[] | null): ExpressionTermCollection {
    return ExpressionTermCollection.fromPrimitives(value || []);
  }

  getColumnType() {
    return 'jsonb';
  }
}
