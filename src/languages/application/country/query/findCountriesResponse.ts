import Country, { CountryPrimitives } from '@src/languages/domain/country/country';
import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';

export default class FindCountriesResponse extends QueryResponse {
  private constructor(countries?: CountryPrimitives[]) {
    super(countries);
  }

  static fromCountries(countries: Country[]): FindCountriesResponse {
    return new FindCountriesResponse(countries.map((country: Country) => country.toPrimitives()));
  }
}
