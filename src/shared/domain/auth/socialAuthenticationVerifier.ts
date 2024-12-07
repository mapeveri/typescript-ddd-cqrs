export interface SocialAuthenticationVerifier {
  verify(token: string): Promise<boolean>;
}

export const SOCIAL_AUTHENTICATION_VERIFIER = Symbol('SocialAuthenticationVerifier');
