import { Query } from '@src/shared/domain/bus/queryBus/query';

export default class SearchTermQuery implements Query {
  constructor(
    public readonly term: string,
    public readonly size: number,
    public readonly page: number,
    public readonly orderBy?: string,
    public readonly orderType?: string,
  ) {}
}
