import Country from './country';

interface CountryRepository {
  findAll(): Promise<Country[]>;

  findById(id: string): Promise<Country | null>;

  save(country: Country): Promise<any>;
}

export default CountryRepository;
