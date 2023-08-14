export type WordTermPrimitives = {
  word: string;
  description: string;
  example: string;
  hashtags: Array<string>;
};

export default class WordTerm {
  private constructor(
    private readonly word: string,
    private readonly description: string,
    private readonly example: string,
    private readonly hashtags: Array<string>
  ) {}

  static of(wordTerm: WordTermPrimitives): WordTerm {
    return new WordTerm(wordTerm.word, wordTerm.description, wordTerm.example, wordTerm.hashtags);
  }

  static fromPrimitives(wordTerm: WordTermPrimitives): WordTerm {
    return new WordTerm(wordTerm.word, wordTerm.description, wordTerm.example, wordTerm.hashtags);
  }

  toPrimitives(): WordTermPrimitives {
    return {
      word: this.word,
      description: this.description,
      example: this.example,
      hashtags: this.hashtags,
    };
  }
}
