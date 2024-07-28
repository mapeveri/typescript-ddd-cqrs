import { SocialAuthenticator } from '@src/shared/domain/auth/socialAuthenticator';

export class SocialAuthenticatorMock implements SocialAuthenticator {
  private toReturn: boolean;

  constructor() {
    this.toReturn = false;
  }

  add(value: boolean): void {
    this.toReturn = value;
  }

  clean(): void {
    this.toReturn = false;
  }

  async login(_token: string): Promise<boolean> {
    return Promise.resolve(this.toReturn);
  }
}
