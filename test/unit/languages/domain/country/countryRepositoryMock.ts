import { expect, jest } from '@jest/globals';
import Country from '@src/languages/domain/country/country';
import CountryRepository from '@src/languages/domain/country/countryRepository';
import CountryId from '@src/languages/domain/country/countryId';

export class CountryRepositoryMock implements CountryRepository {
  private findByIdMock: jest.Mock;
  private findAllMock: jest.Mock;
  private saveMock: jest.Mock;
  private countries: Country[];

  constructor() {
    this.findByIdMock = jest.fn();
    this.findAllMock = jest.fn();
    this.saveMock = jest.fn();
    this.countries = [];
  }

  add(country: Country) {
    return this.countries.push(country);
  }

  clean(): void {
    this.findByIdMock = jest.fn();
    this.findAllMock = jest.fn();
    this.saveMock = jest.fn();
    this.countries = [];
  }

  async findAll(): Promise<Country[]> {
    this.findAllMock();
    return this.countries;
  }

  async findById(id: CountryId): Promise<Country | null> {
    this.findByIdMock(id);
    return this.countries.length > 0 ? this.countries[0] : null;
  }

  async save(country: Country): Promise<any> {
    this.saveMock(country);
  }

  shouldStore(country: Country): void {
    expect(this.saveMock).toHaveBeenCalledWith(country);
  }

  shouldNotStore(): void {
    expect(this.saveMock).not.toHaveBeenCalled();
  }
}
