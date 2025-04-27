import { EntitySchema } from '@mikro-orm/core';
import Expression from '@src/language/domain/term/expression/expression';
import { ExpressionTermCollectionType } from '../types/expressionTermCollectionType';
import { TermSchema } from './term';
import Term from '@src/language/domain/term/term';

export const ExpressionSchema = new EntitySchema<Expression, Term>({
  class: Expression,
  name: 'Expression',
  extends: TermSchema,
  properties: {
    terms: {
      type: ExpressionTermCollectionType,
    },
  },
  discriminatorValue: 'expression',
});
