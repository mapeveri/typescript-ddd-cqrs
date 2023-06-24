import WordTermCollection from '@src/languages/domain/word/valueObjects/wordTermCollection';
import WordTerm from '@src/languages/domain/word/valueObjects/wordTerm';
import WordTermMother from './wordTermMother';

export default class WordTermCollectionMother {
  static random(terms: Array<WordTerm>): WordTermCollection {
    return WordTermCollection.of(terms ?? [WordTermMother.random()]);
  }
}
