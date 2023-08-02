import { Injectable } from '@nestjs/common';
import { SocialLogin } from '@src/languages/domain/auth/socialLogin';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export default class GoogleSocialLogin implements SocialLogin {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async login(token: string): Promise<boolean> {
    let isValid;
    try {
      await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      isValid = true;
    } catch (e) {
      console.error(e);
      isValid = false;
    }

    return isValid;
  }
}
