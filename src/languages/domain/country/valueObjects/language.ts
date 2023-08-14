export type LanguagePrimitives = {
  name: string;
  languageId: string;
};

export default class Language {
  private constructor(private readonly name: string, private readonly languageId: string) {}

  static of(language: LanguagePrimitives): Language {
    return new Language(language.name, language.languageId);
  }

  static fromPrimitives(language: LanguagePrimitives): Language {
    return new Language(language.name, language.languageId);
  }

  toPrimitives(): LanguagePrimitives {
    return {
      name: this.name,
      languageId: this.languageId,
    };
  }
}
