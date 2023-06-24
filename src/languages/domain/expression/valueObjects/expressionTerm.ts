export type ExpressionTermPrimitives = {
  expression: string;
  description: string;
  example: string;
  hashtags: Array<string>;
};

export default class ExpressionTerm {
  expression: string;
  description: string;
  example: string;
  hashtags: Array<string>;

  private constructor(expression: string, description: string, example: string, hashtags: Array<string>) {
    this.expression = expression;
    this.description = description;
    this.example = example;
    this.hashtags = hashtags;
  }

  static of(wordTerm: ExpressionTermPrimitives): ExpressionTerm {
    return new ExpressionTerm(wordTerm.expression, wordTerm.description, wordTerm.example, wordTerm.hashtags);
  }

  static fromPrimitives(wordTerm: ExpressionTermPrimitives): ExpressionTerm {
    return new ExpressionTerm(wordTerm.expression, wordTerm.description, wordTerm.example, wordTerm.hashtags);
  }

  toObject(): ExpressionTermPrimitives {
    return {
      expression: this.expression,
      description: this.description,
      example: this.example,
      hashtags: this.hashtags,
    };
  }
}
