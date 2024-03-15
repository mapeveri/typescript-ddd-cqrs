import FindCountryQuery from '@src/languages/application/country/query/find/findCountryQuery';
import faker from 'faker';

export class FindCountryQueryMother {
  static random(id?: string): FindCountryQuery {
    return new FindCountryQuery(id ?? faker.datatype.uuid());
  }
}
