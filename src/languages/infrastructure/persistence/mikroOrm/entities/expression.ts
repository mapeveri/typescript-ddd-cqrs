import { EntitySchema } from '@mikro-orm/core';
import Expression from '@src/languages/domain/term/expression/expression';
import Term from '@src/languages/domain/term/term';
import { ExpressionTermCollectionType } from '../types/expressionTermCollectionType';

export const ExpressionSchema = new EntitySchema<Expression>({
  class: Expression,
  tableName: 'expressions',
  extends: Term.name,
  properties: {
    terms: {
      type: ExpressionTermCollectionType,
    },
  },
});
