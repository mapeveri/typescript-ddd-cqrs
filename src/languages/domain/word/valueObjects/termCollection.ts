import Term, { WordTerm } from './term';

export default class TermCollection {
  terms: Array<Term>;

  constructor(terms: Array<Term>) {
    this.terms = terms;
  }

  static create(primitiveTerms: Array<{ [key: string]: string }>): TermCollection {
    const terms = primitiveTerms.map((term: { [key: string]: any }): Term => {
      return new Term(term['title'], term['description'], term['example'], term['tagged_words']);
    });

    return new this(terms);
  }

  toArray(): Array<WordTerm> {
    return this.terms.map((term: Term) => term.toObject());
  }
}
