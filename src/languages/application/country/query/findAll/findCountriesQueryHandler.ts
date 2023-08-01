import CountryRepository, { COUNTRY_REPOSITORY } from '@src/languages/domain/country/countryRepository';
import QueryResponse from '@src/shared/domain/buses/queryBus/queryResponse';
import FindCountriesResponse from './findCountriesResponse';
import { Inject } from '@src/shared/domain/injector/inject.decorator';

export default class FindCountriesQueryHandler {
  constructor(@Inject(COUNTRY_REPOSITORY) private countryRepository: CountryRepository) {}

  async handle(): Promise<QueryResponse> {
    const countries = await this.countryRepository.findAll();
    return FindCountriesResponse.fromCountries(countries);
  }
}
