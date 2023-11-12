import { SOCIAL_AUTHENTICATOR } from '@src/languages/domain/auth/socialAuthenticator';
import GoogleSocialAuthenticator from '../oauth/googleSocialAuthenticator';

export const services = [
  {
    provide: SOCIAL_AUTHENTICATOR,
    useClass: GoogleSocialAuthenticator,
  },
];
