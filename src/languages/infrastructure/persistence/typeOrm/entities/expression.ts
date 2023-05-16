import { EntitySchema } from 'typeorm';
import Expression from '../../../../domain/expression/expression';
import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistence/typeOrm/transformers/valueObjectTransformer';
import UserId from '../../../../domain/user/valueObjects/userId';

export default new EntitySchema<Expression>({
  name: Expression.name,
  tableName: 'expressions',
  target: Expression,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    languageId: {
      type: String,
    },
    countryId: {
      type: String,
    },
    terms: {
      type: 'simple-array',
      default: [],
    },
    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId),
    },
  },
});
