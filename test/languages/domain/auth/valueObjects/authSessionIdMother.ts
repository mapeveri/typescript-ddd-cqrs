import AuthSessionId from '@src/languages/domain/auth/valueObjects/authSessionId';
import faker from 'faker';

export class AuthSessionIdMother {
  static random(id?: string): AuthSessionId {
    return AuthSessionId.of(id ?? faker.datatype.uuid());
  }
}
