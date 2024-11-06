import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';
import { IQueryHandler, QueryHandler } from '@src/shared/domain/bus/queryBus/queryHandler';
import FindTermQuery from '@src/languages/application/term/query/findTermQuery';

@QueryHandler(FindTermQuery)
export default class FindTermQueryHandler implements IQueryHandler<FindTermQuery> {
  constructor() {}

  async execute(_query: FindTermQuery): Promise<QueryResponse> {
    return {
      content: '',
    };
  }
}
