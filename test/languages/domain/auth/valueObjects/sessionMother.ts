import faker from 'faker';
import Session from '@src/languages/domain/auth/valueObjects/session';

export interface AuthSessionMotherProps {
  token?: string;
  name?: string;
  provider?: string;
  email?: string;
  photos?: string;
}

export class SessionMother {
  static random(props?: AuthSessionMotherProps): Session {
    const { token, name, provider, email, photos } = props ?? {};

    return Session.fromPrimitives({
      name: name ?? faker.name.findName(),
      provider: provider ?? faker.random.word(),
      email: email ?? faker.internet.email(),
      photo: photos ?? faker.image.imageUrl(),
      token: token ?? faker.random.word(),
    });
  }
}
