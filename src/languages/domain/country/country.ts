import CountryId from './valueObjects/countryId';

export interface Language {
  name: string;
  languageId: string;
}

export default class Country {
  id: CountryId;
  name: string;
  iso: string;
  languages: Array<Language>;

  constructor(id: CountryId, name: string, iso: string, languages: Array<Language>) {
    this.id = id;
    this.name = name;
    this.iso = iso;
    this.languages = languages;
  }

  static create(id: CountryId, name: string, iso: string, languages: Array<Language> = []): Country {
    return new this(id, name, iso, languages);
  }

  toObject(): object {
    return {
      id: this.id.toString(),
      name: this.name,
      iso: this.iso,
      languages: this.languages.map((country) => {
        return { name: country.name, language_id: country.languageId };
      }),
    };
  }
}
