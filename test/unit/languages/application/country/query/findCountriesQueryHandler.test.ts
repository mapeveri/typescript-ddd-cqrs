import { beforeEach, describe, expect, it } from '@jest/globals';
import Country from '@src/languages/domain/country/country';
import { FindCountriesQueryMother } from './findCountriesQueryMother';
import FindCountriesQueryHandler from '@src/languages/application/country/query/findCountriesQueryHandler';
import { CountryRepositoryMock } from '@test/unit/languages/domain/country/countryRepositoryMock';
import CountryMother from '@test/unit/languages/domain/country/countryMother';

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

      expect(expected.content).toEqual([
        {
          id: countryOne.id.toString(),
          name: countryOne.name,
          iso: countryOne.iso,
          languages: countryOne.languages.toArray(),
        },
        {
          id: countryTwo.id.toString(),
          name: countryTwo.name,
          iso: countryTwo.iso,
          languages: countryTwo.languages.toArray(),
        },
      ]);
    });
  });
});
