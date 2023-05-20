import ExpressionTerm, { ExpressionTermDTO } from './expressionTerm';

export default class ExpressionTermCollection {
  terms: Array<ExpressionTerm>;

  constructor(terms: Array<ExpressionTerm>) {
    this.terms = terms;
  }

  static create(primitiveTerms: Array<{ [key: string]: string }>): ExpressionTermCollection {
    const terms = primitiveTerms.map((term: { [key: string]: any }): ExpressionTerm => {
      return new ExpressionTerm(term['title'], term['description'], term['example'], term['tagged_words']);
    });

    return new this(terms);
  }

  toArray(): Array<ExpressionTermDTO> {
    return this.terms.map((term: ExpressionTerm) => term.toObject());
  }
}
