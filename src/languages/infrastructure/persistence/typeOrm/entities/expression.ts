import { EntitySchema } from 'typeorm';
import Expression from '@src/languages/domain/term/expression/expression';
import ExpressionTermCollectionTransformer from '../transformers/expressionTermCollectionTransformer';
import ExpressionTermCollection from '@src/languages/domain/term/expression/expressionTermCollection';
import { TermSchema } from '@src/languages/infrastructure/persistence/typeOrm/entities/term';

export const ExpressionSchema = new EntitySchema<Expression>({
  name: Expression.name,
  tableName: 'expressions',
  target: Expression,
  type: 'entity-child',
  columns: {
    ...TermSchema.options.columns,
    terms: {
      type: 'json',
      transformer: new ExpressionTermCollectionTransformer(),
      default: ExpressionTermCollection.fromPrimitives([]),
    },
  },
});
