import { Query } from '@src/shared/domain/buses/queryBus/query';

export default class FindCountryQuery implements Query {
  constructor(public readonly id: string) {}
}
