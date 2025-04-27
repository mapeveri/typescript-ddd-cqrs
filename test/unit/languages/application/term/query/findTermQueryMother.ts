import FindTermQuery from '@src/language/application/term/query/findTermQuery';
import faker from 'faker';

export class FindTermQueryMother {
  static random(id?: string): FindTermQuery {
    return new FindTermQuery(id ?? faker.datatype.uuid());
  }
}
