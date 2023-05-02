import { EntitySchema } from 'typeorm';
import User from '../../../../domain/user/user';
import Word from '../../../../domain/word/word';
import Expression from '../../../../domain/expression/expression';

export default new EntitySchema<User>({
  name: User.name,
  tableName: 'users',
  target: User,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    name: {
      type: String,
    },
    provider: {
      type: String,
    },
    email: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  relations: {
    words: {
      type: 'one-to-many',
      target: () => Word,
    },
    expressions: {
      type: 'one-to-many',
      target: () => Expression,
    },
  },
});
