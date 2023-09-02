import { QueryHandler as NestQueryHandler, IQueryHandler as NestICommandHandler, IQuery } from '@nestjs/cqrs';

export function QueryHandler(query: IQuery): ClassDecorator {
  return NestQueryHandler(query);
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IQueryHandler<TQuery extends IQuery = any, TRes = any> extends NestICommandHandler {
  execute(query: TQuery): Promise<TRes>;
}
