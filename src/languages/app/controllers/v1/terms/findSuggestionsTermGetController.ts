import { Request } from 'express';
import { Controller, Get, HttpCode, Inject, Req, UseGuards } from '@nestjs/common';
import { NestJwtAuthGuard } from '@src/shared/guards/nestJwtAuthGuard';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TermViewsResponse } from './termViewsResponse';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/bus/queryBus/queryBus';
import FindSuggestionsTermQuery from '@src/languages/application/term/query/findSuggestionsTermQuery';

@ApiTags('Terms')
@Controller()
export default class FindSuggestionsTermGetController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Get('user/suggestions')
  @HttpCode(200)
  @ApiOkResponse({ type: TermViewsResponse })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(NestJwtAuthGuard)
  async run(@Req() req: Request): Promise<TermViewsResponse> {
    const userId = req.user['id'];

    return await this.queryBus.ask(new FindSuggestionsTermQuery(userId));
  }
}
