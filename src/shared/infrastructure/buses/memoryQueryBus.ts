import { Query } from '../../domain/buses/queryBus/query';
import { QueryBus } from '../../domain/buses/queryBus/queryBus';
import { QueryHandler } from '../../domain/buses/queryBus/queryHandler';
import QueryResponse from '../../domain/buses/queryBus/queryResponse';

export default class MemoryQueryBus implements QueryBus {
  private static handlers: { [key: string]: QueryHandler } = {};

  register(query: Query, handler: QueryHandler): void {
    MemoryQueryBus.handlers[query.constructor.name] = handler;
  }

  async ask(query: Query): Promise<QueryResponse> {
    const handler = MemoryQueryBus.handlers[query.constructor.name];
    return await handler.handle(query);
  }
}
