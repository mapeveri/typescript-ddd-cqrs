import UserId from '@src/account/domain/user/userId';
import faker from 'faker';

export class UserIdMother {
  static random(id?: string): UserId {
    return UserId.of(id ?? faker.datatype.uuid());
  }
}
