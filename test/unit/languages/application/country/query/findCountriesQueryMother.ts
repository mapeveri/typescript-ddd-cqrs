import FindCountriesQuery from '@src/languages/application/country/query/findCountriesQuery';

export class FindCountriesQueryMother {
  static random(): FindCountriesQuery {
    return new FindCountriesQuery();
  }
}
