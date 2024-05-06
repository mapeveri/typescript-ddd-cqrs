import User from '@src/languages/domain/user/user';
import UserId from '@src/languages/domain/user/userId';
import faker from 'faker';
import { UserIdMother } from './userIdMother';

interface UserMotherProps {
  id?: UserId;
  name?: string;
  provider?: string;
  email?: string;
  photo?: string;
  interests?: string[];
}

export class UserMother {
  static random(props?: UserMotherProps): User {
    const { id, name, provider, email, photo, interests } = props ?? {};

    return new User(
      id ?? UserIdMother.random(),
      name ?? faker.name.findName(),
      provider ?? faker.random.word(),
      email ?? faker.internet.email(),
      photo ?? faker.image.imageUrl(),
      interests ?? ['test'],
    );
  }
}
