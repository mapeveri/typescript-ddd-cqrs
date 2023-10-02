import AuthSession from './authSession';

export interface AuthSessionRepository {
  save(authSession: AuthSession): Promise<any>;
}

export const AUTH_SESSION_REPOSITORY = Symbol('AuthSessionRepository');
