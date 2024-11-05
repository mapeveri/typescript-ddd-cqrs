import { Query } from '@src/shared/domain/bus/queryBus/query';

export default class FindTermQuery implements Query {
  constructor(public readonly id: string) {}
}
