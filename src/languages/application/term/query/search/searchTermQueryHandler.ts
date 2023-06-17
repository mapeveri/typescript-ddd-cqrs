import { QueryHandler } from '@src/shared/domain/buses/queryBus/queryHandler';
import QueryResponse from '@src/shared/domain/buses/queryBus/queryResponse';
import SearchTermQuery from './searchTermQuery';
import TermRepository from '@src/languages/domain/term/termRepository';
import SearchTermResponse from './searchTermResponse';

export default class SearchTermQueryHandler implements QueryHandler {
  constructor(private termRepository: TermRepository) {}

  async handle(query: SearchTermQuery): Promise<QueryResponse> {
    const terms = await this.termRepository.search(query.term);
    return SearchTermResponse.fromTerms(terms);
  }
}
