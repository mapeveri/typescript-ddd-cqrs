import { EntitySchema } from 'typeorm';
import Expression from '@src/languages/domain/expression/expression';
import ExpressionId from '@src/languages/domain/expression/valueObjects/expressionId';
import { ValueObjectTransformer } from '@src/shared/infrastructure/persistence/typeOrm/transformers/valueObjectTransformer';
import ExpressionTermCollectionTransformer from '../transformers/expressionTermCollectionTransformer';
import ExpressionTermCollection from '@src/languages/domain/expression/valueObjects/expressionTermCollection';
import UserId from '@src/languages/domain/user/valueObjects/userId';

export default new EntitySchema<Expression>({
  name: Expression.name,
  tableName: 'expressions',
  target: Expression,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(ExpressionId),
    },
    languageId: {
      type: String,
    },
    countryId: {
      type: String,
    },
    terms: {
      type: 'json',
      transformer: new ExpressionTermCollectionTransformer(),
      default: new ExpressionTermCollection([]),
    },
    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId),
    },
  },
});
