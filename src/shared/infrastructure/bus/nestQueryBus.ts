import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Query } from '@src/shared/domain/bus/queryBus/query';
import { QueryBus as IQueryBus } from '@src/shared/domain/bus/queryBus/queryBus';
import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';

@Injectable()
export default class NestQueryBusBus implements IQueryBus {
  constructor(private queryBus: QueryBus) {}

  async ask(query: Query): Promise<QueryResponse> {
    return await this.queryBus.execute(query);
  }
}
