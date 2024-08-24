import { dates } from '@src/languages/infrastructure/persistence/mikroOrm/entities/common/dates';
import { EntitySchema } from '@mikro-orm/core';
import Term from '@src/languages/domain/term/term';
import { TermIdType } from '../types/termIdType';
import { CountryIdType } from '../types/countryIdType';
import { UserIdType } from '../types/userIdType';
import { LikesCollectionType } from '../types/likesCollectionType';
import { TermTypeType } from '../types/termTypeType';

export const TermSchema = new EntitySchema<Term>({
  class: Term,
  abstract: true,
  properties: {
    id: {
      type: TermIdType,
      primary: true,
    },
    type: {
      type: TermTypeType,
    },
    languageId: {
      type: String,
      length: 10,
    },
    countryId: {
      type: CountryIdType,
    },
    userId: {
      type: UserIdType,
    },
    likes: {
      type: LikesCollectionType,
    },
    ...dates,
  },
  discriminatorColumn: 'type',
  discriminatorMap: { expression: 'Expression', word: 'Word' },
});
