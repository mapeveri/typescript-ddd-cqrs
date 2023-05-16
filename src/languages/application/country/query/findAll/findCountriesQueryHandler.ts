import Country from '../../../../domain/country/country';
import QueryResponse from '../../../../../shared/domain/buses/queryBus/queryResponse';
import CountryRepository from '../../../../domain/country/countryRepository';

export default class FindCountriesQueryHandler {
  constructor(private countryRepository: CountryRepository) {}

  async handle(): Promise<QueryResponse> {
    const countries = await this.countryRepository.findAll();
    return new QueryResponse(countries.map((country: Country) => country?.toObject()));
  }
}
