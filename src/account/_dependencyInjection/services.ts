import { SOCIAL_AUTHENTICATION_VERIFIER } from '@src/account/domain/auth/socialAuthenticationVerifier';
import GoogleSocialAuthenticationVerifier from '@src/account/infrastructure/auth/oauth/googleSocialAuthenticationVerifier';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

export const services = [
  {
    provide: SOCIAL_AUTHENTICATION_VERIFIER,
    useClass: GoogleSocialAuthenticationVerifier,
  },
  {
    provide: 'GOOGLE_OAUTH_CLIENT',
    useFactory: (configService: ConfigService) => {
      const clientId = configService.get<string>('GOOGLE_CLIENT_ID');
      return new OAuth2Client(clientId);
    },
    inject: [ConfigService],
  },
];
