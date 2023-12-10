import { Query } from '@src/shared/domain/buses/queryBus/query';

export default class FindSuggestionsTermQuery implements Query {
  constructor(public readonly userId: string) {}
}
