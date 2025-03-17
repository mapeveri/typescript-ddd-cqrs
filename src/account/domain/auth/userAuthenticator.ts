export type UserAuthenticatorResponse = { token: string; refreshToken: string };

export type SignUser = {
  id: string;
  name: string;
  email: string;
};

export interface UserAuthenticator {
  sign(user: SignUser): UserAuthenticatorResponse;
}

export const USER_AUTHENTICATOR = Symbol('UserAuthenticator');
