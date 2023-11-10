import { expect, jest } from '@jest/globals';
import { SocialLogin } from '@src/languages/domain/auth/socialLogin';

export class SocialLoginMock implements SocialLogin {
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
