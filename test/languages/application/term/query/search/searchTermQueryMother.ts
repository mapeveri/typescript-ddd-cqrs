import SearchTermQuery from '@src/languages/application/term/query/search/searchTermQuery';
import faker from 'faker';

interface SearchTermParams {
  term?: string;
  size?: number;
  page?: number;
}

export class SearchTermQueryMother {
  static random(params: SearchTermParams): SearchTermQuery {
    return new SearchTermQuery(params.term ?? faker.random.word(), params.size ?? 10, params.page ?? 10);
  }
}
