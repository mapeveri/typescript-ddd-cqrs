import { EntitySchema } from 'typeorm';
import Word from '../../../../domain/word/word';
import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistence/typeOrm/transformers/valueObjectTransformer';
import UserId from '../../../../domain/user/valueObjects/userId';
import CountryId from '../../../../domain/country/valueObjects/countryId';
import WordId from '../../../../domain/word/valueObjects/wordId';

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
      type: 'simple-array',
      default: [],
    },
    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId),
    },
  },
});
