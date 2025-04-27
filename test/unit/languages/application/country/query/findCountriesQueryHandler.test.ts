import { beforeEach, beforeAll, describe, expect, it } from 'vitest';
import Country from '@src/language/domain/country/country';
import { FindCountriesQueryMother } from './findCountriesQueryMother';
import FindCountriesQueryHandler from '@src/language/application/country/query/findCountriesQueryHandler';
import { CountryRepositoryMock } from '@test/unit/languages/domain/country/countryRepositoryMock';
import CountryMother from '@test/unit/languages/domain/country/countryMother';
import FindCountriesQuery from '@src/language/application/country/query/findCountriesQuery';

describe('Given a FindCountryQueryHandler to handle', () => {
  let countryRepository: CountryRepositoryMock;
  let handler: FindCountriesQueryHandler;

  const prepareDependencies = () => {
    countryRepository = new CountryRepositoryMock();
  };

  const initHandler = () => {
    handler = new FindCountriesQueryHandler(countryRepository);
  };

  const clean = () => {
    countryRepository.clean();
  };

  beforeAll(() => {
    prepareDependencies();
    initHandler();
  });

  beforeEach(() => {
    clean();
  });

  describe('When not countries', () => {
    let query: FindCountriesQuery;

    function startScenario() {
      query = FindCountriesQueryMother.random();
    }

    beforeEach(startScenario);

    it('should get an empty result', async () => {
      const expected = await handler.execute(query);

      expect(expected.content).toEqual([]);
    });
  });

  describe('When there are countries', () => {
    let query: FindCountriesQuery;
    let countryOne: Country;
    let countryTwo: Country;

    function startScenario() {
      query = FindCountriesQueryMother.random();

      countryOne = CountryMother.random();
      countryTwo = CountryMother.random();

      countryRepository.add(countryOne);
      countryRepository.add(countryTwo);
    }

    beforeEach(startScenario);

    it('should get a list of countries', async () => {
      const expected = await handler.execute(query);

      expect(expected.content).toEqual([countryOne.toPrimitives(), countryTwo.toPrimitives()]);
    });
  });
});
