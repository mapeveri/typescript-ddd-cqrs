import Country from '@src/languages/domain/country/country';
import QueryResponse from '@src/shared/domain/buses/queryBus/queryResponse';

export default class FindCountriesResponse extends QueryResponse {
  private constructor(countries?: object) {
    super(countries);
  }

  static fromCountries(countries: Country[]): FindCountriesResponse {
    return new FindCountriesResponse(countries?.map((country: Country) => country?.toObject()));
  }
}
