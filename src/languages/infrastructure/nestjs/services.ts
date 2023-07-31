import { SOCIAL_LOGIN } from '@src/languages/domain/auth/socialLogin';
import Google from '../oauth/google';

export const services = [
  {
    provide: SOCIAL_LOGIN,
    useClass: Google,
  },
];
