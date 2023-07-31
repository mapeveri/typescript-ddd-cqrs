import { QueryHandler } from '@src/shared/domain/buses/queryBus/queryHandler';
import QueryResponse from '@src/shared/domain/buses/queryBus/queryResponse';
import SearchTermQuery from './searchTermQuery';
import TermRepository, { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import SearchTermResponse from './searchTermResponse';
import { Inject } from '@nestjs/common';

export default class SearchTermQueryHandler implements QueryHandler {
  constructor(@Inject(TERM_REPOSITORY) private termRepository: TermRepository) {}

  async handle(query: SearchTermQuery): Promise<QueryResponse> {
    const terms = await this.termRepository.search(query.term);
    return SearchTermResponse.fromTerms(terms);
  }
}
