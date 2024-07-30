import Country from '@src/languages/domain/country/country';
import CountryRepository from '@src/languages/domain/country/countryRepository';
import CountryId from '@src/languages/domain/country/countryId';

export class CountryRepositoryMock implements CountryRepository {
  private changed: boolean = false;
  private countriesStored: Country[] = [];
  private toReturn: Country[] = [];

  constructor() {
    this.changed = false;
    this.countriesStored = [];
    this.toReturn = [];
  }

  add(country: Country) {
    return this.toReturn.push(country);
  }

  storedChanged(): boolean {
    return this.changed;
  }

  stored(): Country[] {
    return this.countriesStored;
  }

  clean(): void {
    this.changed = false;
    this.countriesStored = [];
    this.toReturn = [];
  }

  async findAll(): Promise<Country[]> {
    return this.toReturn;
  }

  async findById(_id: CountryId): Promise<Country | null> {
    return this.toReturn.length > 0 ? this.toReturn[0] : null;
  }

  async save(country: Country): Promise<any> {
    this.changed = true;
    this.countriesStored.push(country);
  }
}
