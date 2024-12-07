import { Injectable } from '@nestjs/common';
import { SocialAuthenticationVerifier } from '@src/shared/domain/auth/socialAuthenticationVerifier';
import { OAuth2Client } from 'google-auth-library';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import Logger, { LOGGER } from '@src/shared/domain/logger';

@Injectable()
export default class GoogleSocialAuthenticationVerifier implements SocialAuthenticationVerifier {
  constructor(
    @Inject('GOOGLE_OAUTH_CLIENT') readonly client: OAuth2Client,
    @Inject(LOGGER) private readonly logger: Logger,
  ) {}

  async verify(token: string): Promise<boolean> {
    let isValid;
    try {
      await this.client.verifyIdToken({
        idToken: token,
        audience: this.client._clientId,
      });

      isValid = true;
    } catch (e) {
      this.logger.error(`Error trying to verify token: ${e}`);
      isValid = false;
    }

    return isValid;
  }
}
