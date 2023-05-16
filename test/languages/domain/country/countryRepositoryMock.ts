import { expect, jest } from '@jest/globals';
import Country from '@src/languages/domain/country/country';
import CountryRepository from '@src/languages/domain/country/countryRepository';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';

export class CountryRepositoryMock implements CountryRepository {
  private mockSave = jest.fn();
  private mockFindAll = jest.fn();
  private mockFindById = jest.fn();
  private countries: Country[] = [];

  findAll(): Promise<Country[]> {
    this.assertFindAll();
    return Promise.resolve(this.countries);
  }

  assertFindAll() {
    expect(this.mockFindAll).toHaveBeenCalled();
  }

  findById(id: CountryId): Promise<Country | null> {
    const country: Country | null = this.countries.filter((country) => country.id.equals(id))[0] ?? null;
    return Promise.resolve(country);
  }

  assertFindById(id: string) {
    expect(this.mockFindById).toHaveBeenCalledWith(id);
  }

  async save(country: Country): Promise<any> {
    this.mockSave(country);
  }

  assertSaveHasBeenCalledWith(country: Country): void {
    expect(this.mockSave).toHaveBeenCalledWith(country);
  }
}
