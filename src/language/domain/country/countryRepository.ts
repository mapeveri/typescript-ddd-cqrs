import Country from './country';
import CountryId from './countryId';

interface CountryRepository {
  findAll(): Promise<Country[]>;

  findById(id: CountryId): Promise<Country | null>;

  save(country: Country): void;
}

export default CountryRepository;

export const COUNTRY_REPOSITORY = Symbol('CountryRepository');
