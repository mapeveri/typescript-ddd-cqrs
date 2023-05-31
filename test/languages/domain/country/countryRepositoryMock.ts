import { expect, jest } from '@jest/globals';
import Country from '@src/languages/domain/country/country';
import CountryRepository from '@src/languages/domain/country/countryRepository';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';

export class CountryRepositoryMock implements CountryRepository {
  findById: jest.MockedFunction<(id: CountryId) => Promise<Country | null>>;
  findAll: jest.MockedFunction<() => Promise<Country[]>>;
  save: jest.MockedFunction<(term: Country) => Promise<void>>;

  constructor() {
    this.findById = jest.fn();
    this.findAll = jest.fn();
    this.save = jest.fn();
  }

  expectSaveCalledWith(country: Country): void {
    expect(this.save).toHaveBeenCalledWith(country);
  }
}
