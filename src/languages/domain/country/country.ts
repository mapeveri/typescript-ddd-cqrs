import CountryId from './valueObjects/countryId';
import LanguageCollection from './valueObjects/languageCollection';

export default class Country {
  id: CountryId;
  name: string;
  iso: string;
  languages: LanguageCollection;

  constructor(id: CountryId, name: string, iso: string, languages: LanguageCollection) {
    this.id = id;
    this.name = name;
    this.iso = iso;
    this.languages = languages;
  }

  static create(id: CountryId, name: string, iso: string, languages: LanguageCollection): Country {
    return new this(id, name, iso, languages);
  }

  toPrimitives(): object {
    return {
      id: this.id.toString(),
      name: this.name,
      iso: this.iso,
      languages: this.languages.toArray(),
    };
  }
}
