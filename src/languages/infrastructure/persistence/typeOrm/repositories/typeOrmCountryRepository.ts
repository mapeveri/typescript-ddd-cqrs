import { Injectable } from '@nestjs/common';
import Country from '@src/languages/domain/country/country';
import CountryRepository from '@src/languages/domain/country/countryRepository';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import TypeOrmRepository from '@src/shared/infrastructure/persistence/typeOrm/typeOrmRepository';

@Injectable()
export default class TypeOrmCountryRepository extends TypeOrmRepository implements CountryRepository {
  constructor() {
    super();
  }

  async findAll(): Promise<Country[]> {
    return await this.em.find(Country);
  }

  async findById(id: CountryId): Promise<Country | null> {
    return await this.em.findOne(Country, { where: { id: id } as any });
  }

  async save(country: Country): Promise<any> {
    return await this.em.save(country);
  }
}
