import { QUERY_BUS, QueryBus } from '@src/shared/domain/buses/queryBus/queryBus';
import SearchTermQuery from '@src/languages/application/term/query/search/searchTermQuery';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export default class SearchTermsGetController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Get('search/:term')
  async run(@Param('term') term: string): Promise<any> {
    return await this.queryBus.ask(new SearchTermQuery(term));
  }
}
