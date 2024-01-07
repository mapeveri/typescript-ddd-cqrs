import { Query } from '@src/shared/domain/bus/queryBus/query';

export default class FindUserQuery implements Query {
  constructor(public readonly id: string) {}
}
