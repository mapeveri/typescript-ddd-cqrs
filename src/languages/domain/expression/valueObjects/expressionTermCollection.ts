import ExpressionTerm, { ExpressionTermPrimitives } from './expressionTerm';

export default class ExpressionTermCollection {
  terms: Array<ExpressionTerm>;

  private constructor(terms: Array<ExpressionTerm>) {
    this.terms = terms;
  }

  static of(primitiveTerms: Array<ExpressionTermPrimitives>): ExpressionTermCollection {
    const terms = primitiveTerms.map((expressionTerm: ExpressionTermPrimitives): ExpressionTerm => {
      return ExpressionTerm.of(expressionTerm);
    });

    return new this(terms);
  }

  static fromPrimitives(primitiveTerms: Array<ExpressionTermPrimitives>): ExpressionTermCollection {
    const terms = primitiveTerms.map((expressionTerm: ExpressionTermPrimitives): ExpressionTerm => {
      return ExpressionTerm.fromPrimitives(expressionTerm);
    });
    
    return new this(terms);
  }

  toArray(): Array<ExpressionTermPrimitives> {
    return this.terms.map((term: ExpressionTerm) => term.toPrimitives());
  }
}
