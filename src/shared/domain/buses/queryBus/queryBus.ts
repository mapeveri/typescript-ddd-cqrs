import { Query } from './query';
import QueryResponse from './queryResponse';

export interface QueryBus {
  ask(query: Query): Promise<QueryResponse>;
}

export const QUERY_BUS = Symbol('QueryBus');
