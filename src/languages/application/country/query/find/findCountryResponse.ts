import Country from '@src/languages/domain/country/country';
import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';

export default class FindCountryResponse extends QueryResponse {
  private constructor(country?: object) {
    super(country);
  }

  static fromCountry(country: Country | null): FindCountryResponse {
    return new FindCountryResponse(country?.toPrimitives());
  }
}
