export interface WordTermDTO {
  word: string;
  description: string;
  example: string;
  hashtags: Array<string>;
}

export default class WordTerm {
  word: string;
  description: string;
  example: string;
  hashtags: Array<string>;

  constructor(word: string, description: string, example: string, hashtags: Array<string>) {
    this.word = word;
    this.description = description;
    this.example = example;
    this.hashtags = hashtags;
  }

  static createFromDTO(wordTerm: WordTermDTO): WordTerm {
    return new WordTerm(wordTerm.word, wordTerm.description, wordTerm.example, wordTerm.hashtags);
  }

  toObject(): WordTermDTO {
    return {
      word: this.word,
      description: this.description,
      example: this.example,
      hashtags: this.hashtags,
    };
  }
}
