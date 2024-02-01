import { AuthSessionIdMother } from './authSessionIdMother';
import AuthSession from '@src/languages/domain/auth/authSession';
import AuthSessionId from '@src/languages/domain/auth/authSessionId';
import { SessionMother } from './sessionMother';
import Session from '@src/languages/domain/auth/session';

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
      createdAt ?? new Date(),
    );
  }
}
