import WordId from '@src/languages/domain/word/valueObjects/wordId';
import faker from 'faker';

export class WordIdMother {
  static random(id?: string): WordId {
    return new WordId(id ?? faker.datatype.uuid());
  }
}
