import { beforeEach, describe, expect, it } from '@jest/globals';
import { CountryRepositoryMock } from '@test/languages/domain/country/countryRepositoryMock';
import CountryMother from '@test/languages/domain/country/countryMother';
import Country from '@src/languages/domain/country/country';
import { FindCountriesQueryMother } from './findCountriesQueryMother';
import FindCountriesQueryHandler from '@src/languages/application/country/query/findAll/findCountriesQueryHandler';

describe('FindCountryQueryHandler', () => {
  let countryRepository: CountryRepositoryMock;
  let findCountriesQueryHandler: FindCountriesQueryHandler;

  beforeEach(() => {
    countryRepository = new CountryRepositoryMock();
    findCountriesQueryHandler = new FindCountriesQueryHandler(countryRepository);
  });

  describe('execute', () => {
    it('should get an empty result when no countries', async () => {
      const query = FindCountriesQueryMother.random();

      const expected = await findCountriesQueryHandler.execute(query);

      expect(expected.content).toEqual([]);
    });

    it('should get a list of countries', async () => {
      const countryOne: Country = CountryMother.random();
      const countryTwo: Country = CountryMother.random();
      const query = FindCountriesQueryMother.random();
      countryRepository.add(countryOne);
      countryRepository.add(countryTwo);

      const expected = await findCountriesQueryHandler.execute(query);

      expect(expected.content).toEqual([countryOne.toPrimitives(), countryTwo.toPrimitives()]);
    });
  });
});
