import CountryRepository, { COUNTRY_REPOSITORY } from '@src/languages/domain/country/countryRepository';
import FindCountryQuery from './findCountryQuery';
import QueryResponse from '@src/shared/domain/buses/queryBus/queryResponse';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import FindCountryResponse from './findCountryResponse';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindCountryQuery)
export default class FindCountryQueryHandler implements IQueryHandler<FindCountryQuery> {
  constructor(@Inject(COUNTRY_REPOSITORY) private countryRepository: CountryRepository) {}

  async execute(query: FindCountryQuery): Promise<QueryResponse> {
    const country = await this.countryRepository.findById(CountryId.of(query.id));
    return FindCountryResponse.fromCountry(country);
  }
}
