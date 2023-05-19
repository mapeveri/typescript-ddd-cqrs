export interface WordTerm {
  title: string;
  description: string;
  example: string;
  taggedWords: Array<string>;
}

export default class Term {
  title: string;
  description: string;
  example: string;
  taggedWords: Array<string>;

  constructor(title: string, description: string, example: string, taggedWords: Array<string>) {
    this.title = title;
    this.description = description;
    this.example = example;
    this.taggedWords = taggedWords;
  }

  toObject(): WordTerm {
    return {
      title: this.title,
      description: this.description,
      example: this.example,
      taggedWords: this.taggedWords,
    };
  }
}
