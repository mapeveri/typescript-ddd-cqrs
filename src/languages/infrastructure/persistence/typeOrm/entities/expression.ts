import { EntitySchema } from 'typeorm';
import Expression from '../../../../domain/expression/expression';
import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistence/typeOrm/transformers/valueObjectTransformer';
import UserId from '../../../../domain/user/valueObjects/userId';
import ExpressionId from '../../../../domain/expression/valueObjects/expressionId';
import ExpressionTermCollectionTransformer from '../transformers/expressionTermCollectionTransformer';
import ExpressionTermCollection from '../../../../domain/expression/valueObjects/expressionTermCollection';

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
