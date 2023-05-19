import Term from '@src/languages/domain/word/valueObjects/term';
import TermCollection from '@src/languages/domain/word/valueObjects/termCollection';
import TermMother from './termMother';


export default class TermCollectionMother {
  static random(terms: Array<Term>): TermCollection {
    return new TermCollection(terms ?? [TermMother.random()]);
  }
}
