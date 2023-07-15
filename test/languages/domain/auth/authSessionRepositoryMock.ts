import { expect, jest } from '@jest/globals';
import AuthSession from '@src/languages/domain/auth/authSession';
import { AuthSessionRepository } from '@src/languages/domain/auth/authSessionRepository';

export class AuthSessionRepositoryMock implements AuthSessionRepository {
  save: jest.MockedFunction<(authSession: AuthSession) => Promise<void>>;

  constructor() {
    this.save = jest.fn();
  }

  expectSaveNotCalledWith(): void {
    expect(this.save).not.toHaveBeenCalled();
  }

  expectSaveCalledWith(authSession: AuthSession): void {
    expect(this.save).toHaveBeenCalledWith(authSession);
  }
}
