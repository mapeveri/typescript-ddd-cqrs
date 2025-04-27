import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import Country from '@src/language/domain/country/country';
import CountryRepository from '@src/language/domain/country/countryRepository';
import CountryId from '@src/language/domain/country/countryId';
import { CountrySchema } from '../entities/country';

@Injectable()
export default class MikroOrmCountryRepository implements CountryRepository {
  private readonly em: EntityManager;

  constructor(
    @InjectRepository(CountrySchema, 'language')
    private readonly countryRepository: EntityRepository<Country>,
  ) {
    this.em = countryRepository.getEntityManager();
  }

  async findAll(): Promise<Country[]> {
    return await this.countryRepository.findAll();
  }

  async findById(id: CountryId): Promise<Country | null> {
    return await this.countryRepository.findOne(id);
  }

  save(country: Country): void {
    this.em.persist(country);
  }
}
