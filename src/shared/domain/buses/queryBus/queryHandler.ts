import { Query } from './query';
import QueryResponse from './queryResponse';

export interface QueryHandler {
  handle(query: Query): Promise<QueryResponse>;
}
