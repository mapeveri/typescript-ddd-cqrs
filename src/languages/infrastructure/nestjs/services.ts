import { SOCIAL_LOGIN } from '@src/languages/domain/auth/socialLogin';
import GoogleSocialLogin from '../oauth/googleSocialLogin';

export const services = [
  {
    provide: SOCIAL_LOGIN,
    useClass: GoogleSocialLogin,
  },
];
