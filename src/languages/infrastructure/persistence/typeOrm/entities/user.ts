import { EntitySchema } from 'typeorm';
import User from '../../../../domain/user/user';
import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistence/typeOrm/transformers/valueObjectTransformer';
import Email from '../../../../../shared/domain/valueObjects/email';
import UserId from '../../../../domain/user/valueObjects/userId';

export default new EntitySchema<User>({
  name: User.name,
  tableName: 'users',
  target: User,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(UserId),
    },
    name: {
      type: String,
    },
    provider: {
      type: String,
    },
    email: {
      type: String,
      transformer: ValueObjectTransformer(Email),
    },
    photo: {
      type: String,
    },
  },
});
