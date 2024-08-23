import { EntitySchema } from '@mikro-orm/core';
import Term from '@src/languages/domain/term/term';
import Word from '@src/languages/domain/term/word/word';
import { WordTermCollectionType } from '../../types/wordTermCollectionType';

export const ExpressionSchema = new EntitySchema<Word>({
  class: Word,
  tableName: 'expressions',
  extends: Term.name,
  properties: {
    terms: {
      type: WordTermCollectionType,
    },
  },
});
