import { expect, jest } from '@jest/globals';
import Country from '@src/languages/domain/country/country';
import CountryRepository from '@src/languages/domain/country/countryRepository';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';

export class CountryRepositoryMock implements CountryRepository {
  private findByIdMock: jest.Mock;
  private findAllMock: jest.Mock;
  private saveMock: jest.Mock;
  private countries: Country[] = []
  private country: Country | null;

  constructor() {
    this.findByIdMock = jest.fn();
    this.findAllMock = jest.fn();
    this.saveMock = jest.fn();
  }

  returnOnFindById(country?: Country | null) {
    this.country = country ? country : null;
  }

  returnOnFindAll(countries: Country[]) {
    this.countries = countries;
  }

  async findAll(): Promise<Country[]> {
    this.findAllMock();
    return this.countries;
  }

  async findById(id: CountryId): Promise<Country | null> {
    this.findByIdMock(id);
    return this.country;
  }

  async save(country: Country): Promise<any> {
    this.saveMock(country);
  }

  expectSaveCalledWith(country: Country): void {
    expect(this.saveMock).toHaveBeenCalledWith(country);
  }

  expectSaveNotCalled(): void {
    expect(this.saveMock).not.toHaveBeenCalled();
  }
}
