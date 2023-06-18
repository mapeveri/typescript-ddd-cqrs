import WordTerm, { WordTermDTO } from './wordTerm';

export default class WordTermCollection {
  terms: Array<WordTerm>;

  constructor(terms: Array<WordTerm>) {
    this.terms = terms;
  }

  static create(primitiveTerms: Array<WordTermDTO>): WordTermCollection {
    const wordTerms = primitiveTerms.map((wordTerm: WordTermDTO): WordTerm => {
      return WordTerm.fromDto(wordTerm);
    });

    return new this(wordTerms);
  }

  toArray(): Array<WordTermDTO> {
    return this.terms.map((term: WordTerm) => term.toObject());
  }
}
