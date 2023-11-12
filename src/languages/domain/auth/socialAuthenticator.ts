export interface SocialAuthenticator {
  login(token: string): Promise<boolean>;
}

export const SOCIAL_AUTHENTICATOR = Symbol('SocialAuthenticator');
