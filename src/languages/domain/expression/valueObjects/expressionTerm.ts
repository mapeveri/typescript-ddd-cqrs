export type ExpressionTermPrimitives = {
  expression: string;
  description: string;
  example: string;
  hashtags: Array<string>;
};

export default class ExpressionTerm {
  private constructor(
    private readonly expression: string,
    private readonly description: string,
    private readonly example: string,
    private readonly hashtags: Array<string>
  ) {}

  static of(wordTerm: ExpressionTermPrimitives): ExpressionTerm {
    return new ExpressionTerm(wordTerm.expression, wordTerm.description, wordTerm.example, wordTerm.hashtags);
  }

  static fromPrimitives(wordTerm: ExpressionTermPrimitives): ExpressionTerm {
    return new ExpressionTerm(wordTerm.expression, wordTerm.description, wordTerm.example, wordTerm.hashtags);
  }

  toPrimitives(): ExpressionTermPrimitives {
    return {
      expression: this.expression,
      description: this.description,
      example: this.example,
      hashtags: this.hashtags,
    };
  }
}
