import { Injectable } from '@nestjs/common';
import { SocialAuthenticator } from '@src/languages/domain/auth/socialAuthenticator';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export default class GoogleSocialAuthenticator implements SocialAuthenticator {
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
