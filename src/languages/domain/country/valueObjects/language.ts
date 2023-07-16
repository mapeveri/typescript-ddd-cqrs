export type LanguagePrimitives = {
  name: string;
  languageId: string;
};

export default class Language {
  name: string;
  languageId: string;

  private constructor(name: string, languageId: string) {
    this.name = name;
    this.languageId = languageId;
  }

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
