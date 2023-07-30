import { Query } from './query';
import { QueryHandler } from './queryHandler';
import QueryResponse from './queryResponse';

export interface QueryBus {
  ask(query: Query): Promise<QueryResponse>;
  register(query: Query, handler: QueryHandler): void;
}

export const QUERY_BUS = Symbol('QueryBus');
