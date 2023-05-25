import { EntitySchema } from 'typeorm';
import User from '@src/languages/domain/user/user';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import Email from '@src/shared/domain/valueObjects/email';
import { ValueObjectTransformer } from '@src/shared/infrastructure/persistence/typeOrm/transformers/valueObjectTransformer';

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
