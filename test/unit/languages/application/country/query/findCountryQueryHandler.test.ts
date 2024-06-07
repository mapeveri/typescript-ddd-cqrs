import { beforeEach, describe, expect, it } from '@jest/globals';
import { FindCountryQueryMother } from './findCountryQueryMother';
import FindCountryQueryHandler from '@src/languages/application/country/query/findCountryQueryHandler';
import { CountryRepositoryMock } from '@test/unit/languages/domain/country/countryRepositoryMock';
import { CountryIdMother } from '@test/unit/languages/domain/country/countryIdMother';
import Country from '@src/languages/domain/country/country';
import CountryMother from '@test/unit/languages/domain/country/countryMother';

describe('FindCountryQueryHandler', () => {
  let countryRepository: CountryRepositoryMock;
  let findCountryQueryHandler: FindCountryQueryHandler;

  beforeEach(() => {
    countryRepository = new CountryRepositoryMock();
    findCountryQueryHandler = new FindCountryQueryHandler(countryRepository);
  });

  describe('execute', () => {
    it('should get an empty result when the country does not exists', async () => {
      const countryId = CountryIdMother.random();
      const query = FindCountryQueryMother.random(countryId.value);

      const expected = await findCountryQueryHandler.execute(query);

      expect(expected.content).toEqual(undefined);
    });

    it('should get a country', async () => {
      const country: Country = CountryMother.random();
      const query = FindCountryQueryMother.random(country.id.value);
      countryRepository.add(country);

      const expected = await findCountryQueryHandler.execute(query);

      expect(expected.content).toEqual({
        id: country.id.toString(),
        name: country.name,
        iso: country.iso,
        languages: country.languages.toArray(),
      });
    });
  });
});
