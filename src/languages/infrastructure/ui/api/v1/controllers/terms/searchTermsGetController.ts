import { QUERY_BUS, QueryBus } from '@src/shared/domain/buses/queryBus/queryBus';
import SearchTermQuery from '@src/languages/application/term/query/search/searchTermQuery';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@src/shared/infrastructure/nestjs/guards/JwtAuthGuard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Terms')
@Controller()
export default class SearchTermsGetController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Get('search/:term')
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiResponse({ status: 500, description: 'Internal Server Error.'})
  @UseGuards(JwtAuthGuard)
  async run(@Param('term') term: string): Promise<any> {
    return await this.queryBus.ask(new SearchTermQuery(term));
  }
}
