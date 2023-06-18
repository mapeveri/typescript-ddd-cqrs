export interface LanguageDTO {
  name: string;
  languageId: string;
}

export default class Language {
  name: string;
  languageId: string;

  constructor(name: string, languageId: string) {
    this.name = name;
    this.languageId = languageId;
  }

  static fromDto(language: LanguageDTO): Language {
    return new Language(language.name, language.languageId);
  }

  toObject(): LanguageDTO {
    return {
      name: this.name,
      languageId: this.languageId,
    };
  }
}
