import { Query } from '@src/shared/domain/bus/queryBus/query';

export default class FindSuggestionsTermQuery implements Query {
  constructor(public readonly userId: string) {}
}
