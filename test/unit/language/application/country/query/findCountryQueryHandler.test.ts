import { beforeEach, beforeAll, describe, expect, it } from 'vitest';
import { FindCountryQueryMother } from './findCountryQueryMother';
import FindCountryQueryHandler from '@src/language/application/country/query/findCountryQueryHandler';
import { CountryRepositoryMock } from '@test/unit/language/domain/country/countryRepositoryMock';
import { CountryIdMother } from '@test/unit/language/domain/country/countryIdMother';
import Country from '@src/language/domain/country/country';
import CountryMother from '@test/unit/language/domain/country/countryMother';
import FindCountryQuery from '@src/language/application/country/query/findCountryQuery';
import InvalidArgumentException from '@src/shared/domain/exceptions/invalidArgumentException';

describe('Given a FindCountryQueryHandler to handle', () => {
  let countryRepository: CountryRepositoryMock;
  let handler: FindCountryQueryHandler;

  const prepareDependencies = () => {
    countryRepository = new CountryRepositoryMock();
  };

  const initHandler = () => {
    handler = new FindCountryQueryHandler(countryRepository);
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

  describe('When the country id is invalid', () => {
    let query: FindCountryQuery;

    function startScenario() {
      query = FindCountryQueryMother.random('');
    }

    beforeEach(startScenario);

    it('should thrown an exception', async () => {
      await expect(handler.execute(query)).rejects.toThrowError(InvalidArgumentException);
    });
  });

  describe('When the country does not exist', () => {
    let query: FindCountryQuery;

    function startScenario() {
      const countryId = CountryIdMother.random();
      query = FindCountryQueryMother.random(countryId.toString());
    }

    beforeEach(startScenario);

    it('should get an empty result', async () => {
      const expected = await handler.execute(query);

      expect(expected.content).toEqual(undefined);
    });
  });

  describe('When the country exists', () => {
    let query: FindCountryQuery;
    let country: Country;

    function startScenario() {
      country = CountryMother.random();
      query = FindCountryQueryMother.random(country.getId().toString());
      countryRepository.add(country);
    }

    beforeEach(startScenario);

    it('should get the country', async () => {
      const expected = await handler.execute(query);

      expect(expected.content).toEqual(country.toPrimitives());
    });
  });
});
