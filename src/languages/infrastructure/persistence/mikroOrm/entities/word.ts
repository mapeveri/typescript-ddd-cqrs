import { EntitySchema } from '@mikro-orm/core';
import { TermSchema } from './term';
import Word from '@src/languages/domain/term/word/word';
import { WordTermCollectionType } from '../types/wordTermCollectionType';

export const WordSchema = new EntitySchema({
  class: Word,
  extends: TermSchema,
  properties: {
    terms: {
      type: WordTermCollectionType,
    },
  },
  discriminatorValue: 'word',
});
