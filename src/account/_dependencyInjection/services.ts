import { SOCIAL_AUTHENTICATION_VERIFIER } from '@src/account/domain/auth/socialAuthenticationVerifier';
import GoogleSocialAuthenticationVerifier from '@src/account/infrastructure/auth/oauth/googleSocialAuthenticationVerifier';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import NestJwtUserAuthenticator from '@src/account/infrastructure/auth/jwt/nestJsUserAuthenticator';
import { USER_AUTHENTICATOR } from '@src/account/domain/auth/userAuthenticator';

export const services = [
  {
    provide: SOCIAL_AUTHENTICATION_VERIFIER,
    useClass: GoogleSocialAuthenticationVerifier,
  },
  {
    provide: USER_AUTHENTICATOR,
    useClass: NestJwtUserAuthenticator,
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
