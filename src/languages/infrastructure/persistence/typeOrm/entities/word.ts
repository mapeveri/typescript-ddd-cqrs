import { EntitySchema } from 'typeorm';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import WordId from '@src/languages/domain/word/valueObjects/wordId';
import Word from '@src/languages/domain/word/word';
import { ValueObjectTransformer } from '@src/shared/infrastructure/persistence/typeOrm/transformers/valueObjectTransformer';
import WordTermCollectionTransformer from '../transformers/wordTermCollectionTransformer';
import WordTermCollection from '@src/languages/domain/word/valueObjects/wordTermCollection';
import UserId from '@src/languages/domain/user/valueObjects/userId';

export default new EntitySchema<Word>({
  name: Word.name,
  tableName: 'words',
  target: Word,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(WordId),
    },
    languageId: {
      type: String,
    },
    countryId: {
      type: String,
      transformer: ValueObjectTransformer(CountryId),
    },
    terms: {
      type: 'json',
      transformer: new WordTermCollectionTransformer(),
      default: WordTermCollection.fromPrimitives([]),
    },
    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId),
    },
  },
});
