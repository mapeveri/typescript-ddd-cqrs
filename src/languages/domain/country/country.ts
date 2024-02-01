import { AggregateRoot } from '@src/shared/domain/aggregate/aggregateRoot';
import CountryId from './countryId';
import LanguageCollection from './languageCollection';

export default class Country extends AggregateRoot {
  id: CountryId;
  name: string;
  iso: string;
  languages: LanguageCollection;

  constructor(id: CountryId, name: string, iso: string, languages: LanguageCollection) {
    super();

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
