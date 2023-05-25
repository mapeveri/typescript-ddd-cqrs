import { Repository } from 'typeorm';
import CountryEntity from '../entities/country';
import AppDataSource from '@src/shared/infrastructure/persistence/typeOrm/dataSource';
import Country from '@src/languages/domain/country/country';
import CountryRepository from '@src/languages/domain/country/countryRepository';
import UserId from '@src/languages/domain/user/valueObjects/userId';

export default class TypeOrmCountryRepository implements CountryRepository {
  private repository: Repository<Country>;

  constructor() {
    this.repository = AppDataSource.manager.getRepository(CountryEntity);
  }

  async findAll(): Promise<Country[]> {
    return await this.repository.find();
  }

  async findById(id: UserId): Promise<Country | null> {
    return await this.repository.findOne({ where: { id: id as any } });
  }

  async save(country: Country): Promise<any> {
    return await this.repository.save(country);
  }
}
