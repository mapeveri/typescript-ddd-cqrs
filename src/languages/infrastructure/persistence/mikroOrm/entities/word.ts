import { EntitySchema } from '@mikro-orm/core';
import { WordTermCollectionType } from '../types/wordTermCollectionType';
import Word from '@src/languages/domain/term/word/word';
import { TermSchema } from './term';

export const WordSchema = new EntitySchema({
  class: Word,
  tableName: 'words',
  extends: TermSchema,
  properties: {
    terms: {
      type: WordTermCollectionType,
    },
  },
});
