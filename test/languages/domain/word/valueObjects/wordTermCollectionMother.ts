import WordTermCollection from '@src/languages/domain/word/valueObjects/wordTermCollection';
import { WordTermPrimitives } from '@src/languages/domain/word/valueObjects/wordTerm';
import WordTermMother from './wordTermMother';

export default class WordTermCollectionMother {
  static random(terms: Array<WordTermPrimitives>): WordTermCollection {
    return WordTermCollection.of(terms ?? [WordTermMother.random().toPrimitives()]);
  }
}
