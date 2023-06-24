import UserId from '@src/languages/domain/user/valueObjects/userId';
import faker from 'faker';

export class UserIdMother {
  static random(id?: string): UserId {
    return UserId.of(id ?? faker.datatype.uuid());
  }
}
