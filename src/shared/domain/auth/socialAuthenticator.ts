export interface SocialAuthenticator {
  verify(token: string): Promise<boolean>;
}

export const SOCIAL_AUTHENTICATOR = Symbol('SocialAuthenticator');
