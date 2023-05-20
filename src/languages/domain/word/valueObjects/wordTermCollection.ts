import WordTerm, { WordTermDTO } from './wordTerm';

export default class WordTermCollection {
  terms: Array<WordTerm>;

  constructor(terms: Array<WordTerm>) {
    this.terms = terms;
  }

  static create(primitiveTerms: Array<{ [key: string]: string }>): WordTermCollection {
    const terms = primitiveTerms.map((term: { [key: string]: any }): WordTerm => {
      return new WordTerm(term['title'], term['description'], term['example'], term['tagged_words']);
    });

    return new this(terms);
  }

  toArray(): Array<WordTermDTO> {
    return this.terms.map((term: WordTerm) => term.toObject());
  }
}
