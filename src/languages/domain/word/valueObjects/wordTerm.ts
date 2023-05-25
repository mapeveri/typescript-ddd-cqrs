import CommonTerm from '@src/shared/domain/valueObjects/commonTerm';

export interface WordTermDTO {
  title: string;
  description: string;
  example: string;
  taggedWords: Array<string>;
}

export default class WordTerm extends CommonTerm {
  toObject(): WordTermDTO {
    return {
      title: this.title,
      description: this.description,
      example: this.example,
      taggedWords: this.taggedWords,
    };
  }
}
