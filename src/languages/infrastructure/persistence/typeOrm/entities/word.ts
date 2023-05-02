import { EntitySchema } from 'typeorm';
import Word from '../../../../domain/word/word';
import User from '../../../../domain/user/user';

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
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: () => User,
    },
  },
});
