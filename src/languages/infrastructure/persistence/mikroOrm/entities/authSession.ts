import { EntitySchema } from '@mikro-orm/core';
import AuthSession from '@src/languages/domain/auth/authSession';
import { AuthSessionIdType } from '../types/authSessionIdType';

export const AuthSessionSchema = new EntitySchema<AuthSession>({
  class: AuthSession,
  tableName: 'auth_sessions',
  properties: {
    id: {
      type: AuthSessionIdType,
      primary: true,
    },
    session: {
      type: 'json',
    },
    createdAt: {
      type: Date,
    },
  },
});
