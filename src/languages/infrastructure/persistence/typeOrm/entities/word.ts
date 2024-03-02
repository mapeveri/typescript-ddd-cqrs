import { EntitySchema } from 'typeorm';
import Word from '@src/languages/domain/term/word/word';
import WordTermCollectionTransformer from '../transformers/wordTermCollectionTransformer';
import WordTermCollection from '@src/languages/domain/term/word/wordTermCollection';
import { TermSchema } from '@src/languages/infrastructure/persistence/typeOrm/entities/term';

export const WordSchema = new EntitySchema<Word>({
  name: Word.name,
  tableName: 'words',
  target: Word,
  type: 'entity-child',
  columns: {
    ...TermSchema.options.columns,
    terms: {
      type: 'json',
      transformer: new WordTermCollectionTransformer(),
      default: WordTermCollection.fromPrimitives([]),
    },
  },
});
