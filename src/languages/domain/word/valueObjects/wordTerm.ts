export type WordTermPrimitives = {
  word: string;
  description: string;
  example: string;
  hashtags: Array<string>;
};

export default class WordTerm {
  word: string;
  description: string;
  example: string;
  hashtags: Array<string>;

  private constructor(word: string, description: string, example: string, hashtags: Array<string>) {
    this.word = word;
    this.description = description;
    this.example = example;
    this.hashtags = hashtags;
  }

  static of(wordTerm: WordTermPrimitives): WordTerm {
    return new WordTerm(wordTerm.word, wordTerm.description, wordTerm.example, wordTerm.hashtags);
  }

  static fromPrimitives(wordTerm: WordTermPrimitives): WordTerm {
    return new WordTerm(wordTerm.word, wordTerm.description, wordTerm.example, wordTerm.hashtags);
  }

  toObject(): WordTermPrimitives {
    return {
      word: this.word,
      description: this.description,
      example: this.example,
      hashtags: this.hashtags,
    };
  }
}
