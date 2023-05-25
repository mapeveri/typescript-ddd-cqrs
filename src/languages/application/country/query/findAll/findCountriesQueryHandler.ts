import Country from '@src/languages/domain/country/country';
import CountryRepository from '@src/languages/domain/country/countryRepository';
import QueryResponse from '@src/shared/domain/buses/queryBus/queryResponse';

export default class FindCountriesQueryHandler {
  constructor(private countryRepository: CountryRepository) {}

  async handle(): Promise<QueryResponse> {
    const countries = await this.countryRepository.findAll();
    return new QueryResponse(countries.map((country: Country) => country?.toObject()));
  }
}
