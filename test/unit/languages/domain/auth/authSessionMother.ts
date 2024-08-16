import { AuthSessionIdMother } from './authSessionIdMother';
import AuthSession from '../../../../../src/languages/domain/auth/authSession';
import AuthSessionId from '@src/languages/domain/auth/authSessionId';
import faker from 'faker';

interface AuthSessionMotherProps {
  token?: string;
  name?: string;
  provider?: string;
  email?: string;
  photo?: string;
}

interface AuthSessionMotherProps {
  id?: AuthSessionId;
  session?: AuthSessionMotherProps;
  createdAt?: Date;
}

export class AuthSessionMother {
  static random(props?: AuthSessionMotherProps): AuthSession {
    const { id, session, createdAt } = props ?? {};

    const sessionData = {
      name: session?.name ?? faker.name.findName(),
      provider: session?.provider ?? faker.random.word(),
      email: session?.email ?? faker.internet.email(),
      photo: session?.photo ?? faker.image.imageUrl(),
      token: session?.token ?? faker.random.word(),
    };

    return new AuthSession(
      id ?? AuthSessionIdMother.random(),
      sessionData,
      createdAt ?? new Date(),
    );
  }
}
