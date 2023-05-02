import { Repository } from 'typeorm';
import Country from '../../../../domain/country/country';
import CountryEntity from '../entities/country';
import CountryRepository from '../../../../domain/country/countryRepository';
import AppDataSource from './../../../../../shared/infrastructure/persistence/typeOrm/dataSource';

export default class TypeOrmCountryRepository implements CountryRepository {
  private repository: Repository<Country>;

  constructor() {
    this.repository = AppDataSource.manager.getRepository(CountryEntity);
  }

  async findAll(): Promise<Country[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Country | null> {
    return await this.repository.findOneBy({ id: id });
  }

  async save(country: Country): Promise<any> {
    return await this.repository.save(country);
  }
}
