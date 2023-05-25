import CountryRepository from '@src/languages/domain/country/countryRepository';
import { QueryHandler } from '@src/shared/domain/buses/queryBus/queryHandler';
import FindCountryQuery from './findCountryQuery';
import QueryResponse from '@src/shared/domain/buses/queryBus/queryResponse';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';

export default class FindCountryQueryHandler implements QueryHandler {
  constructor(private countryRepository: CountryRepository) {}

  async handle(query: FindCountryQuery): Promise<QueryResponse> {
    const country = await this.countryRepository.findById(new CountryId(query.id));
    return new QueryResponse(country?.toObject());
  }
}
