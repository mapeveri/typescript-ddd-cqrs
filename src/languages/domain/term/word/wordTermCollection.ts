import WordTerm, { WordTermPrimitives } from './wordTerm';

export default class WordTermCollection {
  private constructor(private readonly terms: Array<WordTerm>) {}

  static of(primitiveTerms: Array<WordTermPrimitives>): WordTermCollection {
    const wordTerms = primitiveTerms.map((wordTerm: WordTermPrimitives): WordTerm => {
      return WordTerm.of(wordTerm);
    });

    return new this(wordTerms);
  }

  static fromPrimitives(primitiveTerms: Array<WordTermPrimitives>): WordTermCollection {
    const wordTerms = primitiveTerms.map((wordTerm: WordTermPrimitives): WordTerm => {
      return WordTerm.fromPrimitives(wordTerm);
    });

    return new this(wordTerms);
  }

  toArray(): Array<WordTermPrimitives> {
    return this.terms.map((term: WordTerm) => term.toPrimitives());
  }
}
