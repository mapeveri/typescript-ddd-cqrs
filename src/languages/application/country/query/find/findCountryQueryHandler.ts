import { QueryHandler } from '../../../../../shared/domain/buses/queryBus/queryHandler';
import QueryResponse from '../../../../../shared/domain/buses/queryBus/queryResponse';
import CountryRepository from '../../../../domain/country/countryRepository';
import FindCountryQuery from './findCountryQuery';

export default class FindCountryQueryHandler implements QueryHandler {
  constructor(private countryRepository: CountryRepository) {}

  async handle(query: FindCountryQuery): Promise<QueryResponse> {
    const country = await this.countryRepository.findById(query.id);
    return new QueryResponse(country?.toObject());
  }
}
