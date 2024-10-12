import AuthSession from './authSession';

export interface AuthSessionRepository {
  save(authSession: AuthSession): void;
}

export const AUTH_SESSION_REPOSITORY = Symbol('AuthSessionRepository');
