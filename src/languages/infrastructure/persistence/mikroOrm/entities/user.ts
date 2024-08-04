import { EntitySchema } from '@mikro-orm/core';
import User from '@src/languages/domain/user/user';
import { UserIdType } from '../../mikroOrm/types/userIdType';
import { EmailType } from '../../../../../shared/infrastructure/persistence/mikroOrm/types/emailType';

export const UserSchema = new EntitySchema<User>({
  class: User,
  tableName: 'users',
  properties: {
    id: {
      type: UserIdType,
      primary: true,
    },
    name: {
      type: 'string',
    },
    provider: {
      type: 'string',
    },
    email: {
      type: EmailType,
    },
    photo: {
      type: 'string',
      nullable: true,
    },
    interests: {
      type: 'array',
      nullable: true,
    },
  },
});
