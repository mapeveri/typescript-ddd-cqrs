import AuthSessionId from '@src/languages/domain/auth/authSessionId';
import { ValueObjectType } from '@src/shared/infrastructure/persistence/mikroOrm/types/valueObjectType';

export class AuthSessionIdType extends ValueObjectType<string> {
  constructor() {
    super(AuthSessionId);
  }

  getColumnType() {
    return 'uuid';
  }
}
