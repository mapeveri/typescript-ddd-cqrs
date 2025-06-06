import FindCountryQuery from '@src/language/application/country/query/findCountryQuery';
import faker from 'faker';

export class FindCountryQueryMother {
  static random(id?: string): FindCountryQuery {
    return new FindCountryQuery(id ?? faker.datatype.uuid());
  }
}
