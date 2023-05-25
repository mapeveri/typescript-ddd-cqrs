import CommonTerm from '@src/shared/domain/valueObjects/commonTerm';

export interface ExpressionTermDTO {
  title: string;
  description: string;
  example: string;
  taggedWords: Array<string>;
}

export default class ExpressionTerm extends CommonTerm {
  toObject(): ExpressionTermDTO {
    return {
      title: this.title,
      description: this.description,
      example: this.example,
      taggedWords: this.taggedWords,
    };
  }
}
