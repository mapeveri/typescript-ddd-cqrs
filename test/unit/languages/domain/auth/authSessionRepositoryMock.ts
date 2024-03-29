import { expect, jest } from '@jest/globals';
import AuthSession from '@src/languages/domain/auth/authSession';
import { AuthSessionRepository } from '@src/languages/domain/auth/authSessionRepository';

export class AuthSessionRepositoryMock implements AuthSessionRepository {
  private saveMock: jest.Mock;

  constructor() {
    this.saveMock = jest.fn();
  }

  async save(authSession: AuthSession): Promise<any> {
    this.saveMock(authSession);
  }

  shouldNotStore(): void {
    expect(this.saveMock).not.toHaveBeenCalled();
  }

  shouldStoreWith(authSession: AuthSession): void {
    expect(this.saveMock).toHaveBeenCalledWith(authSession);
  }
}
