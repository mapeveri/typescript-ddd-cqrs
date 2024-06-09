import faker from 'faker';
import FindSuggestionsTermQuery from '@src/languages/application/term/query/findSuggestionsTermQuery';

export class FindSuggestionsTermQueryMother {
  static random(userId?: string): FindSuggestionsTermQuery {
    return new FindSuggestionsTermQuery(userId ?? faker.datatype.uuid());
  }
}
