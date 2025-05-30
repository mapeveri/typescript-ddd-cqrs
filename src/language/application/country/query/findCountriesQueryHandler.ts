import CountryRepository, { COUNTRY_REPOSITORY } from '@src/language/domain/country/countryRepository';
import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';
import FindCountriesResponse from './findCountriesResponse';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { IQueryHandler, QueryHandler } from '@src/shared/domain/bus/queryBus/queryHandler';
import FindCountriesQuery from './findCountriesQuery';

@QueryHandler(FindCountriesQuery)
export default class FindCountriesQueryHandler implements IQueryHandler<FindCountriesQuery> {
  constructor(@Inject(COUNTRY_REPOSITORY) private readonly countryRepository: CountryRepository) {}

  async execute(_query: FindCountriesQuery): Promise<QueryResponse> {
    const countries = await this.countryRepository.findAll();
    return FindCountriesResponse.fromCountries(countries);
  }
}
