import { COUNTRY_REPOSITORY } from '@src/languages/domain/country/countryRepository';
import { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import MikroOrmUserRepository from '@src/languages/infrastructure/persistence/mikroOrm/repositories/mikroOrmUserRepository';
import MikroOrmCountryRepository from '../infrastructure/persistence/mikroOrm/repositories/mikroOrmCountryRepository';
import MikroOrmTermRepository from '../infrastructure/persistence/mikroOrm/repositories/mikroOrmTermRepository';

export const repositories = [
  {
    provide: COUNTRY_REPOSITORY,
    useClass: MikroOrmCountryRepository,
  },
  {
    provide: TERM_REPOSITORY,
    useClass: MikroOrmTermRepository,
  },
  {
    provide: USER_REPOSITORY,
    useClass: MikroOrmUserRepository,
  },
];
