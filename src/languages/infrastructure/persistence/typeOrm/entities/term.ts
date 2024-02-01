import CountryId from '@src/languages/domain/country/countryId';
import { ValueObjectTransformer } from '@src/shared/infrastructure/persistence/typeOrm/transformers/valueObjectTransformer';
import UserId from '@src/languages/domain/user/userId';
import { dates } from '@src/languages/infrastructure/persistence/typeOrm/entities/common/dates';
import { EntitySchema } from 'typeorm';
import Term from '@src/languages/domain/term/term';
import TermId from '@src/languages/domain/term/termId';

export const termSchema = new EntitySchema<Term>({
  name: Term.name,
  target: Term,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(TermId),
    },
    type: {
      type: String,
    },
    languageId: {
      type: String,
    },
    countryId: {
      type: String,
      transformer: ValueObjectTransformer(CountryId),
    },
    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId),
    },
    ...dates,
  },
  inheritance: {
    pattern: 'STI',
    column: 'type',
  },
});
