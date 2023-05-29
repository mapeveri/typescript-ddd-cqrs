import ExpressionTerm, { ExpressionTermDTO } from './expressionTerm';

export default class ExpressionTermCollection {
  terms: Array<ExpressionTerm>;

  constructor(terms: Array<ExpressionTerm>) {
    this.terms = terms;
  }

  static create(primitiveTerms: Array<ExpressionTermDTO>): ExpressionTermCollection {
    const terms = primitiveTerms.map((expressionTerm: ExpressionTermDTO): ExpressionTerm => {
      return ExpressionTerm.createFromDTO(expressionTerm);
    });

    return new this(terms);
  }

  toArray(): Array<ExpressionTermDTO> {
    return this.terms.map((term: ExpressionTerm) => term.toObject());
  }
}
