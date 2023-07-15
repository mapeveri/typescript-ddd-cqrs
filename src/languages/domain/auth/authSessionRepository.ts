import AuthSession from './authSession';

export interface AuthSessionRepository {
  save(authSession: AuthSession): Promise<any>;
}
