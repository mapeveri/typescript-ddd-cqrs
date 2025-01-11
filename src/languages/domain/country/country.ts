import { AggregateRoot } from '@src/shared/domain/aggregate/aggregateRoot';
import CountryId from './countryId';
import LanguageCollection from './languageCollection';
import CountryCreatedEvent from '@src/languages/domain/country/countryCreatedEvent';
import { LanguagePrimitives } from '@src/languages/domain/country/language';

export type CountryPrimitives = {
  id: string;
  name: string;
  iso: string;
  languages: LanguagePrimitives[];
};

export default class Country extends AggregateRoot {
  constructor(private id: CountryId, private name: string, private iso: string, private languages: LanguageCollection) {
    super();
  }

  static create(id: string, name: string, iso: string, languages: LanguagePrimitives[]): Country {
    const country = new this(CountryId.of(id), name, iso, LanguageCollection.of(languages));
    country.record(new CountryCreatedEvent(id.toString(), name, iso, languages));

    return country;
  }

  public getId(): CountryId {
    return this.id;
  }

  toPrimitives(): CountryPrimitives {
    return {
      id: this.id.toString(),
      name: this.name,
      iso: this.iso,
      languages: this.languages.toArray(),
    };
  }
}
