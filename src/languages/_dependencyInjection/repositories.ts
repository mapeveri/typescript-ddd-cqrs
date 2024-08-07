import { AUTH_SESSION_REPOSITORY } from '@src/languages/domain/auth/authSessionRepository';
import TypeOrmAuthSessionRepository from '../infrastructure/persistence/typeOrm/repositories/typeOrmAuthSessionRepository';
import { COUNTRY_REPOSITORY } from '@src/languages/domain/country/countryRepository';
import TypeOrmCountryRepository from '../infrastructure/persistence/typeOrm/repositories/typeOrmCountryRepository';
import { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import TypeOrmTermRepository from '@src/languages/infrastructure/persistence/typeOrm/repositories/typeOrmTermRepository';
import MikroOrmUserRepository from '@src/languages/infrastructure/persistence/mikroOrm/repositories/mikroOrmUserRepository';

export const repositories = [
  {
    provide: AUTH_SESSION_REPOSITORY,
    useClass: TypeOrmAuthSessionRepository,
  },
  {
    provide: COUNTRY_REPOSITORY,
    useClass: TypeOrmCountryRepository,
  },
  {
    provide: TERM_REPOSITORY,
    useClass: TypeOrmTermRepository,
  },
  {
    provide: USER_REPOSITORY,
    useClass: MikroOrmUserRepository,
  },
];
