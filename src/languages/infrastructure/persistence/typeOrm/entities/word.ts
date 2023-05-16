import { EntitySchema } from 'typeorm';
import Word from '../../../../domain/word/word';
import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistence/typeOrm/transformers/valueObjectTransformer';
import UserId from '../../../../domain/user/valueObjects/userId';

export default new EntitySchema<Word>({
  name: Word.name,
  tableName: 'words',
  target: Word,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    languageId: {
      type: String,
    },
    countryId: {
      type: String,
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
