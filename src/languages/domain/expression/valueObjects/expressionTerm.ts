export interface ExpressionTermDTO {
  expression: string;
  description: string;
  example: string;
  hashtags: Array<string>;
}

export default class ExpressionTerm {
  expression: string;
  description: string;
  example: string;
  hashtags: Array<string>;

  constructor(expression: string, description: string, example: string, hashtags: Array<string>) {
    this.expression = expression;
    this.description = description;
    this.example = example;
    this.hashtags = hashtags;
  }

  static fromDto(wordTerm: ExpressionTermDTO): ExpressionTerm {
    return new ExpressionTerm(wordTerm.expression, wordTerm.description, wordTerm.example, wordTerm.hashtags);
  }

  toObject(): ExpressionTermDTO {
    return {
      expression: this.expression,
      description: this.description,
      example: this.example,
      hashtags: this.hashtags,
    };
  }
}
