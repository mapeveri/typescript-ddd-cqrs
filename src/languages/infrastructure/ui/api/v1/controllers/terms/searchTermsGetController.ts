import { QUERY_BUS, QueryBus } from '@src/shared/domain/buses/queryBus/queryBus';
import SearchTermQuery from '@src/languages/application/term/query/search/searchTermQuery';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@src/shared/infrastructure/nestjs/guards/JwtAuthGuard';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SearchTermsGetResponse } from './searchTermsGetResponse';

@ApiTags('Terms')
@Controller()
export default class SearchTermsGetController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Get('search/:term')
  @HttpCode(200)
  @ApiOkResponse({ type: SearchTermsGetResponse })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(JwtAuthGuard)
  async run(@Param('term') term: string): Promise<any> {
    return await this.queryBus.ask(new SearchTermQuery(term));
  }
}
