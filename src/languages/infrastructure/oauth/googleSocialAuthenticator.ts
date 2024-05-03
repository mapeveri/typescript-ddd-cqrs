import { Injectable } from '@nestjs/common';
import { SocialAuthenticator } from '@src/languages/domain/auth/socialAuthenticator';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import Logger, { LOGGER } from '@src/shared/domain/logger';

@Injectable()
export default class GoogleSocialAuthenticator implements SocialAuthenticator {
  private client: OAuth2Client;
  private readonly clientId: string | undefined;

  constructor(readonly configService: ConfigService, @Inject(LOGGER) private readonly logger: Logger) {
    this.clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    this.client = new OAuth2Client(this.clientId);
  }

  async login(token: string): Promise<boolean> {
    let isValid;
    try {
      await this.client.verifyIdToken({
        idToken: token,
        audience: this.clientId,
      });

      isValid = true;
    } catch (e) {
      this.logger.error(`Error trying to verify token: ${e}`);
      isValid = false;
    }

    return isValid;
  }
}
