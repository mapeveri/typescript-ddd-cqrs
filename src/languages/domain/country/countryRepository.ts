import Country from './country';
import CountryId from './valueObjects/countryId';

interface CountryRepository {
  findAll(): Promise<Country[]>;

  findById(id: CountryId): Promise<Country | null>;

  save(country: Country): Promise<any>;
}

export default CountryRepository;
