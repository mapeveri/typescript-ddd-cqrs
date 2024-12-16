import { EntitySchema } from '@mikro-orm/core';
import User from '@src/account/domain/user/user';
import { UserIdType } from '@src/account/infrastructure/persistence/mikroOrm/types/userIdType';
import { EmailType } from '@src/shared/infrastructure/persistence/mikroOrm/types/emailType';

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
      length: 255,
    },
    provider: {
      type: 'string',
      length: 75,
    },
    email: {
      type: EmailType,
      length: 100,
    },
    photo: {
      type: 'string',
      nullable: true,
      length: 500,
    },
    interests: {
      type: 'array',
      nullable: true,
    },
  },
});
