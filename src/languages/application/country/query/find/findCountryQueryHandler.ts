import CountryRepository, { COUNTRY_REPOSITORY } from '@src/languages/domain/country/countryRepository';
import { QueryHandler } from '@src/shared/domain/buses/queryBus/queryHandler';
import FindCountryQuery from './findCountryQuery';
import QueryResponse from '@src/shared/domain/buses/queryBus/queryResponse';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import FindCountryResponse from './findCountryResponse';
import { Inject } from '@nestjs/common';

export default class FindCountryQueryHandler implements QueryHandler {
  constructor(@Inject(COUNTRY_REPOSITORY) private countryRepository: CountryRepository) {}

  async handle(query: FindCountryQuery): Promise<QueryResponse> {
    const country = await this.countryRepository.findById(CountryId.of(query.id));
    return FindCountryResponse.fromCountry(country);
  }
}
