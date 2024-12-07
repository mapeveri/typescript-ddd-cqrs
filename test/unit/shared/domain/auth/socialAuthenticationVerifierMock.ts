import { SocialAuthenticationVerifier } from '@src/shared/domain/auth/socialAuthenticationVerifier';

export class SocialAuthenticationVerifierMock implements SocialAuthenticationVerifier {
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

  async verify(_token: string): Promise<boolean> {
    return Promise.resolve(this.toReturn);
  }
}
