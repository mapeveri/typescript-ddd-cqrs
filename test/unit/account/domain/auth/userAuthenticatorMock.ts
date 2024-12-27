import { UserAuthenticator, UserAuthenticatorResponse } from '@src/account/domain/auth/userAuthenticator';

export class UserAuthenticatorMock implements UserAuthenticator {
  private toReturn: UserAuthenticatorResponse[];

  constructor() {
    this.toReturn = [];
  }

  add(value: UserAuthenticatorResponse): void {
    this.toReturn.push(value);
  }

  clean(): void {
    this.toReturn = [];
  }

  sign(_user: object): UserAuthenticatorResponse {
    return this.toReturn[0];
  }
}
