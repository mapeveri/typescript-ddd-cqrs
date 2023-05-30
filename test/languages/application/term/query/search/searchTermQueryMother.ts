import SearchTermQuery from '@src/languages/application/term/query/search/searchTermQuery';
import faker from 'faker';

export class SearchTermQueryMother {
  static random(term?: string): SearchTermQuery {
    return new SearchTermQuery(term ?? faker.random.word());
  }
}
