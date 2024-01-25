import { AUTH_SESSION_REPOSITORY } from '@src/languages/domain/auth/authSessionRepository';
import TypeOrmAuthSessionRepository from '../infrastructure/persistence/typeOrm/repositories/typeOrmAuthSessionRepository';
import { COUNTRY_REPOSITORY } from '@src/languages/domain/country/countryRepository';
import TypeOrmCountryRepository from '../infrastructure/persistence/typeOrm/repositories/typeOrmCountryRepository';
import TypeOrmUserRepository from '../infrastructure/persistence/typeOrm/repositories/typeOrmUserRepository';
import { TERM_REPOSITORY as READ_LAYER_TERM_REPOSITORY } from '@src/languages/application/term/projection/termViewRepository';
import MongoTermViewRepository from '../infrastructure/persistence/mongo/repositories/mongoTermViewRepository';
import { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import TypeOrmTermRepository from '@src/languages/infrastructure/persistence/typeOrm/repositories/typeOrmTermRepository';

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
    provide: READ_LAYER_TERM_REPOSITORY,
    useClass: MongoTermViewRepository,
  },
  {
    provide: TERM_REPOSITORY,
    useClass: TypeOrmTermRepository,
  },
  {
    provide: USER_REPOSITORY,
    useClass: TypeOrmUserRepository,
  },
];
