import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import Country from '@src/languages/domain/country/country';
import CountryRepository from '@src/languages/domain/country/countryRepository';
import CountryId from '@src/languages/domain/country/countryId';
import { CountrySchema } from '../entities/country';

@Injectable()
export default class MikroOrmCountryRepository implements CountryRepository {
  constructor(
    @InjectRepository(CountrySchema)
    private readonly countryRepository: EntityRepository<Country>,
    private readonly em: EntityManager,
  ) {}

  async findAll(): Promise<Country[]> {
    return await this.countryRepository.findAll();
  }

  async findById(id: CountryId): Promise<Country | null> {
    return await this.countryRepository.findOne(id);
  }

  async save(country: Country): Promise<void> {
    this.em.persist(country);
    return Promise.resolve();
  }
}
