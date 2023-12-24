import { SOCIAL_AUTHENTICATOR } from '@src/languages/domain/auth/socialAuthenticator';
import GoogleSocialAuthenticator from '../../languages/infrastructure/oauth/googleSocialAuthenticator';
import { SseService } from '@src/api/sse/sseService';
import { UnhandledExceptionsBusService } from '@src/api/sse/unhandledExceptionsBusService';

export const services = [
  SseService,
  UnhandledExceptionsBusService,
  {
    provide: SOCIAL_AUTHENTICATOR,
    useClass: GoogleSocialAuthenticator,
  },
];
