import FindCountriesQuery from '@src/language/application/country/query/findCountriesQuery';

export class FindCountriesQueryMother {
  static random(): FindCountriesQuery {
    return new FindCountriesQuery();
  }
}
