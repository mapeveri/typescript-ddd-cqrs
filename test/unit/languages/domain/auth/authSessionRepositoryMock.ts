import AuthSession from '@src/languages/domain/auth/authSession';
import { AuthSessionRepository } from '@src/languages/domain/auth/authSessionRepository';

export class AuthSessionRepositoryMock implements AuthSessionRepository {
  private authSessionsStored: AuthSession[];
  private changed: boolean = false;

  constructor() {
    this.authSessionsStored = [];
    this.changed = false;
  }

  clean(): void {
    this.authSessionsStored = [];
    this.changed = false;
  }

  storedChanged(): boolean {
    return this.changed;
  }

  stored(): AuthSession[] {
    return this.authSessionsStored;
  }

  async save(authSession: AuthSession): Promise<any> {
    this.changed = true;
    this.authSessionsStored.push(authSession);
  }
}
