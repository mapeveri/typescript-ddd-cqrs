import { COUNTRY_REPOSITORY } from '@src/language/domain/country/countryRepository';
import { TERM_REPOSITORY } from '@src/language/domain/term/termRepository';
import MikroOrmCountryRepository from '../infrastructure/persistence/mikroOrm/repositories/mikroOrmCountryRepository';
import MikroOrmTermRepository from '../infrastructure/persistence/mikroOrm/repositories/mikroOrmTermRepository';
import { COLLABORATOR_REPOSITORY } from '@src/language/domain/collaborator/collaboratorRepository';
import { TranslatingCollaboratorRepository } from '@src/language/infrastructure/persistence/http/TranslatingCollaboratorRepository';

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
    provide: COLLABORATOR_REPOSITORY,
    useClass: TranslatingCollaboratorRepository,
  },
];
