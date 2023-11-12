import { expect, jest } from '@jest/globals';
import { SocialAuthenticator } from '@src/languages/domain/auth/socialAuthenticator';

export class SocialAuthenticatorMock implements SocialAuthenticator {
  private loginMock: jest.Mock;
  private loginSuccess: boolean;

  constructor() {
    this.loginMock = jest.fn();
  }

  returnOnLogin(loginSuccess: boolean): void {
    this.loginSuccess = loginSuccess;
  }

  async login(token: string): Promise<boolean> {
    this.loginMock(token);

    return Promise.resolve(this.loginSuccess);
  }

  expectLoginCalledWith(token: string): void {
    expect(this.loginMock).toHaveBeenCalledWith(token);
  }

  expectLoginNotCalled(): void {
    expect(this.loginMock).not.toHaveBeenCalled();
  }
}
