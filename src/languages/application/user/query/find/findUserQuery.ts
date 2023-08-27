import { Query } from '@src/shared/domain/buses/queryBus/query';

export default class FindUserQuery implements Query {
  constructor(public readonly id: string) {}
}
