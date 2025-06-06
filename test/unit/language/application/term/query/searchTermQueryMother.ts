import SearchTermQuery from '@src/language/application/term/query/searchTermQuery';
import faker from 'faker';
import { OrderType } from '@src/shared/domain/criteria/orderBy';

interface SearchTermParams {
  term?: string;
  size?: number;
  page?: number;
  orderBy?: string;
  orderType?: OrderType;
}

export class SearchTermQueryMother {
  static random(params: SearchTermParams): SearchTermQuery {
    return new SearchTermQuery(
      params.term ?? faker.random.word(),
      params.size ?? 10,
      params.page ?? 10,
      params.orderBy,
      params.orderType,
    );
  }
}
