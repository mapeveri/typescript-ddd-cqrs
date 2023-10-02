export interface SocialLogin {
  login(token: string): Promise<boolean>;
}

export const SOCIAL_LOGIN = Symbol('SocialLogin');
