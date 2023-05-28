import WordTerm, { WordTermDTO } from './wordTerm';

export default class WordTermCollection {
  terms: Array<WordTerm>;

  constructor(terms: Array<WordTerm>) {
    this.terms = terms;
  }

  static create(primitiveTerms: Array<{ [key: string]: string }>): WordTermCollection {
    const terms = primitiveTerms.map((term: { [key: string]: any }): WordTerm => {
      return new WordTerm(term['word'], term['description'], term['example'], term['hashtags']);
    });

    return new this(terms);
  }

  toArray(): Array<WordTermDTO> {
    return this.terms.map((term: WordTerm) => term.toObject());
  }
}
