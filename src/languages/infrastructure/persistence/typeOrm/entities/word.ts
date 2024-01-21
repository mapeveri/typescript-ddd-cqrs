import { EntitySchema } from 'typeorm';
import Word from '@src/languages/domain/word/word';
import WordTermCollectionTransformer from '../transformers/wordTermCollectionTransformer';
import WordTermCollection from '@src/languages/domain/word/valueObjects/wordTermCollection';
import { termSchema } from '@src/languages/infrastructure/persistence/typeOrm/entities/term';

export default new EntitySchema<Word>({
  name: Word.name,
  tableName: 'words',
  target: Word,
  type: 'entity-child',
  columns: {
    ...termSchema.options.columns,
    terms: {
      type: 'json',
      transformer: new WordTermCollectionTransformer(),
      default: WordTermCollection.fromPrimitives([]),
    },
  },
});
