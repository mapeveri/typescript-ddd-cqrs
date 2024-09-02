import { EntitySchema } from '@mikro-orm/core';
import Expression from '@src/languages/domain/term/expression/expression';
import { ExpressionTermCollectionType } from '../types/expressionTermCollectionType';
import { TermSchema } from './term';

export const ExpressionSchema = new EntitySchema({
  class: Expression,
  extends: TermSchema,
  properties: {
    terms: {
      type: ExpressionTermCollectionType,
    },
  },
  discriminatorValue: 'expression',
});
