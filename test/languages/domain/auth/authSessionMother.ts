import { AuthSessionIdMother } from './valueObjects/authSessionIdMother';
import AuthSession from '@src/languages/domain/auth/authSession';
import AuthSessionId from '@src/languages/domain/auth/valueObjects/authSessionId';
import { SessionMother } from './valueObjects/sessionMother';
import Session from '@src/languages/domain/auth/valueObjects/session';

interface AuthSessionMotherProps {
  id?: AuthSessionId;
  session?: Session;
  createdAt?: Date;
}

export class AuthSessionMother {
  static random(props?: AuthSessionMotherProps): AuthSession {
    const { id, session, createdAt } = props ?? {};

    return new AuthSession(
      id ?? AuthSessionIdMother.random(),
      session ?? SessionMother.random(),
      createdAt ?? new Date()
    );
  }
}
