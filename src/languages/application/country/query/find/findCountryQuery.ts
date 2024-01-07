import { Query } from '@src/shared/domain/bus/queryBus/query';

export default class FindCountryQuery implements Query {
  constructor(public readonly id: string) {}
}
