import Language, { LanguagePrimitives } from './language';

export default class LanguageCollection {
  languages: Array<Language>;

  private constructor(languages: Array<Language>) {
    this.languages = languages;
  }

  static of(primitiveLanguages: Array<LanguagePrimitives>): LanguageCollection {
    const terms = primitiveLanguages.map((language: LanguagePrimitives): Language => {
      return Language.of(language);
    });

    return new this(terms);
  }

  static fromPrimitives(primitiveLanguages: Array<LanguagePrimitives>): LanguageCollection {
    const terms = primitiveLanguages.map((language: LanguagePrimitives): Language => {
      return Language.fromPrimitives(language);
    });

    return new this(terms);
  }

  toArray(): Array<LanguagePrimitives> {
    return this.languages.map((language: Language) => language.toPrimitives());
  }
}
