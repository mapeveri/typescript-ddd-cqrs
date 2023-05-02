import User from '@src/languages/domain/user/user';
import faker from 'faker';

interface UserMotherProps {
  id?: string;
  name?: string;
  provider?: string;
  email?: string;
  photos?: string;
}

export class UserMother {
  static random(props?: UserMotherProps): User {
    const { id, name, provider, email, photos } = props ?? {};

    return new User(
      id ?? faker.datatype.uuid(),
      name ?? faker.name.findName(),
      provider ?? faker.random.word(),
      email ?? faker.internet.email(),
      photos ?? faker.image.imageUrl(),
      [],
      []
    );
  }
}
