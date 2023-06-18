import Language, { LanguageDTO } from './language';

export default class LanguageCollection {
  languages: Array<Language>;

  constructor(languages: Array<Language>) {
    this.languages = languages;
  }

  static create(primitiveLanguages: Array<LanguageDTO>): LanguageCollection {
    const terms = primitiveLanguages.map((language: LanguageDTO): Language => {
      return Language.fromDto(language);
    });

    return new this(terms);
  }

  toArray(): Array<LanguageDTO> {
    return this.languages.map((language: Language) => language.toObject());
  }
}
