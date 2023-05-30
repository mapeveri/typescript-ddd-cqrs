import { Query } from '@src/shared/domain/buses/queryBus/query';

export default class SearchTermQuery implements Query {
  constructor(public readonly term: string) {}
}
