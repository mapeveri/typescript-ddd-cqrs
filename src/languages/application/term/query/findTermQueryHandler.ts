import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';
import { IQueryHandler, QueryHandler } from '@src/shared/domain/bus/queryBus/queryHandler';
import FindTermQuery from '@src/languages/application/term/query/findTermQuery';
import TermId from '@src/languages/domain/term/termId';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import TermRepository, { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import TermDoesNotExistsException from '@src/languages/domain/term/termDoesNotExistsException';
import Term from '@src/languages/domain/term/term';
import FindTermQueryResponse from '@src/languages/application/term/query/findTermQueryResponse';
import { WordPrimitives } from '@src/languages/domain/term/word/word';
import { ExpressionPrimitives } from '@src/languages/domain/term/expression/expression';

@QueryHandler(FindTermQuery)
export default class FindTermQueryHandler implements IQueryHandler<FindTermQuery> {
  constructor(@Inject(TERM_REPOSITORY) private readonly termRepository: TermRepository) {}

  async execute(query: FindTermQuery): Promise<QueryResponse> {
    const termId = TermId.of(query.id);
    const term = await this.getTerm(termId);
    const values = term.toPrimitives() as WordPrimitives | ExpressionPrimitives;

    return FindTermQueryResponse.fromTerm(values);
  }

  private async getTerm(termId: TermId): Promise<Term> {
    const term = await this.termRepository.findById(termId);
    if (!term) {
      throw new TermDoesNotExistsException(termId.toString());
    }

    return term;
  }
}
