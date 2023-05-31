export interface SocialLogin {
  login(token: string): Promise<boolean>;
}
