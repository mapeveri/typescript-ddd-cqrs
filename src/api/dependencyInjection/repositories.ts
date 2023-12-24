import { AUTH_SESSION_REPOSITORY } from '@src/languages/domain/auth/authSessionRepository';
import TypeOrmAuthSessionRepository from '../../languages/infrastructure/persistence/typeOrm/repositories/typeOrmAuthSessionRepository';
import { COUNTRY_REPOSITORY } from '@src/languages/domain/country/countryRepository';
import TypeOrmCountryRepository from '../../languages/infrastructure/persistence/typeOrm/repositories/typeOrmCountryRepository';
import { EXPRESSION_REPOSITORY } from '@src/languages/domain/expression/expressionRepository';
import TypeOrmExpressionRepository from '../../languages/infrastructure/persistence/typeOrm/repositories/typeOrmExpressionRepository';
import TypeOrmWordRepository from '../../languages/infrastructure/persistence/typeOrm/repositories/typeOrmWordRepository';
import TypeOrmUserRepository from '../../languages/infrastructure/persistence/typeOrm/repositories/typeOrmUserRepository';
import { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import MongoTermRepository from '../../languages/infrastructure/persistence/mongo/repositories/mongoTermRepository';
import { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import { WORD_REPOSITORY } from '@src/languages/domain/word/wordRepository';

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
    provide: EXPRESSION_REPOSITORY,
    useClass: TypeOrmExpressionRepository,
  },
  {
    provide: TERM_REPOSITORY,
    useClass: MongoTermRepository,
  },
  {
    provide: USER_REPOSITORY,
    useClass: TypeOrmUserRepository,
  },
  {
    provide: WORD_REPOSITORY,
    useClass: TypeOrmWordRepository,
  },
];
