import faker from 'faker';
import FindSuggestionsTermQuery from '@src/language/application/term/query/findSuggestionsTermQuery';

export class FindSuggestionsTermQueryMother {
  static random(userId?: string): FindSuggestionsTermQuery {
    return new FindSuggestionsTermQuery(userId ?? faker.datatype.uuid());
  }
}
