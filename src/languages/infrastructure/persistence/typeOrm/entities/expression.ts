import { EntitySchema } from 'typeorm';
import Expression from '../../../../domain/expression/expression';
import User from '../../../../domain/user/user';

export default new EntitySchema<Expression>({
  name: Expression.name,
  tableName: 'expressions',
  target: Expression,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    language_id: {
      type: String,
    },
    country_id: {
      type: String,
    },
    terms: {
      type: 'simple-array',
      default: [],
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: () => User,
    },
  },
});
