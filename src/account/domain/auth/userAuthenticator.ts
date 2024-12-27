export type UserAuthenticatorResponse = { token: string; refreshToken: string };

export interface UserAuthenticator {
  sign(user: object): UserAuthenticatorResponse;
}

export const USER_AUTHENTICATOR = Symbol('UserAuthenticator');
