import { expect, jest } from '@jest/globals';
import { SocialLogin } from '@src/languages/domain/auth/socialLogin';

export class SocialLoginMock implements SocialLogin {
  login: jest.MockedFunction<(token: string) => Promise<boolean>>;

  constructor() {
    this.login = jest.fn();
  }

  expectLoginCalledWith(token: string): void {
    expect(this.login).toHaveBeenCalledWith(token);
  }

  expectLoginNotCalled(): void {
    expect(this.login).not.toHaveBeenCalled();
  }
}
