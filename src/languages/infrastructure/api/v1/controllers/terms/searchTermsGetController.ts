import SearchTermQuery from '@src/languages/application/term/query/search/searchTermQuery';
import { Controller, Get, HttpCode, Inject, Param, UseGuards } from '@nestjs/common';
import { NestJwtAuthGuard } from '@src/shared/infrastructure/api/guards/nestJwtAuthGuard';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TermsResponse } from './termsResponse';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/buses/queryBus/queryBus';

@ApiTags('Terms')
@Controller()
export default class SearchTermsGetController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Get('search/:term')
  @HttpCode(200)
  @ApiOkResponse({ type: TermsResponse })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(NestJwtAuthGuard)
  async run(@Param('term') term: string): Promise<any> {
    return await this.queryBus.ask(new SearchTermQuery(term));
  }
}
