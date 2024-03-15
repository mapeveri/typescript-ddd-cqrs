import { expect, jest } from '@jest/globals';
import { SocialAuthenticator } from '@src/languages/domain/auth/socialAuthenticator';

export class SocialAuthenticatorMock implements SocialAuthenticator {
  private loginMock: jest.Mock;
  private loginSuccess: boolean;

  constructor() {
    this.loginMock = jest.fn();
  }

  returnOnAuthenticate(loginSuccess: boolean): void {
    this.loginSuccess = loginSuccess;
  }

  async login(token: string): Promise<boolean> {
    this.loginMock(token);

    return Promise.resolve(this.loginSuccess);
  }

  shouldAuthenticate(token: string): void {
    expect(this.loginMock).toHaveBeenCalledWith(token);
  }

  shouldNotAuthenticate(): void {
    expect(this.loginMock).not.toHaveBeenCalled();
  }
}
