import { EntitySchema } from 'typeorm';
import Word from '../../../../domain/word/word';
import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistence/typeOrm/transformers/valueObjectTransformer';
import UserId from '../../../../domain/user/valueObjects/userId';
import CountryId from '../../../../domain/country/valueObjects/countryId';
import WordId from '../../../../domain/word/valueObjects/wordId';
import WordTermCollectionTransformer from '../transformers/wordTermCollectionTransformer';
import WordTermCollection from '../../../../domain/word/valueObjects/wordTermCollection';

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
      default: new WordTermCollection([]),
    },
    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId),
    },
  },
});
