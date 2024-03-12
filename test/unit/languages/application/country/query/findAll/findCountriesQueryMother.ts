import FindCountriesQuery from '@src/languages/application/country/query/findAll/findCountriesQuery';

export class FindCountriesQueryMother {
  static random(): FindCountriesQuery {
    return new FindCountriesQuery();
  }
}
