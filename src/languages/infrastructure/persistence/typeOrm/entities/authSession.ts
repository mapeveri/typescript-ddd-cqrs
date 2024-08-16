import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '@src/shared/infrastructure/persistence/typeOrm/transformers/valueObjectTransformer';
import AuthSession from '@src/languages/domain/auth/authSession';
import AuthSessionId from '@src/languages/domain/auth/authSessionId';

export const AuthSessionSchema = new EntitySchema<AuthSession>({
  name: AuthSession.name,
  tableName: 'auth_sessions',
  target: AuthSession,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(AuthSessionId),
    },
    session: {
      type: 'json',
    },
  },
});
