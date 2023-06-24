import WordId from '@src/languages/domain/word/valueObjects/wordId';
import faker from 'faker';

export class WordIdMother {
  static random(id?: string): WordId {
    return WordId.of(id ?? faker.datatype.uuid());
  }
}
