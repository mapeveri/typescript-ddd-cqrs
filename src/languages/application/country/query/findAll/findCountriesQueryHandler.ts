import CountryRepository from '@src/languages/domain/country/countryRepository';
import QueryResponse from '@src/shared/domain/buses/queryBus/queryResponse';
import FindCountriesResponse from './findCountriesResponse';

export default class FindCountriesQueryHandler {
  constructor(private countryRepository: CountryRepository) {}

  async handle(): Promise<QueryResponse> {
    const countries = await this.countryRepository.findAll();
    return FindCountriesResponse.fromCountries(countries);
  }
}
