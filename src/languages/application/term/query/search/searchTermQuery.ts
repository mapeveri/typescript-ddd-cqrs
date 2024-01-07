import { Query } from '@src/shared/domain/bus/queryBus/query';

export default class SearchTermQuery implements Query {
  constructor(public readonly term: string) {}
}
