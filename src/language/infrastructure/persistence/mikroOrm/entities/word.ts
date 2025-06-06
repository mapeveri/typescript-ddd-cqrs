import { EntitySchema } from '@mikro-orm/core';
import { TermSchema } from './term';
import Word from '@src/language/domain/term/word/word';
import { WordTermCollectionType } from '../types/wordTermCollectionType';
import Term from '@src/language/domain/term/term';

export const WordSchema = new EntitySchema<Word, Term>({
  class: Word,
  name: 'Word',
  extends: TermSchema,
  properties: {
    terms: {
      type: WordTermCollectionType,
    },
  },
  discriminatorValue: 'word',
});
