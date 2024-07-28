import AuthSession from '@src/languages/domain/auth/authSession';
import { AuthSessionRepository } from '@src/languages/domain/auth/authSessionRepository';

export class AuthSessionRepositoryMock implements AuthSessionRepository {
  private authSessionsStored: AuthSession[];

  constructor() {
    this.authSessionsStored = [];
  }

  clean(): void {
    this.authSessionsStored = [];
  }

  stored(): AuthSession[] {
    return this.authSessionsStored;
  }

  async save(authSession: AuthSession): Promise<any> {
    this.authSessionsStored.push(authSession);
  }
}
