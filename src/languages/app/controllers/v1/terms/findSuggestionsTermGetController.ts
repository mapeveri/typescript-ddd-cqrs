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
import { TermsResponse } from './termsResponse';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/bus/queryBus/queryBus';
import FindSuggestionsTermQuery from '@src/languages/application/term/query/suggestion/findSuggestionsTermQuery';

@ApiTags('Terms')
@Controller()
export default class FindSuggestionsTermGetController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Get('user/suggestions')
  @HttpCode(200)
  @ApiOkResponse({ type: TermsResponse })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(NestJwtAuthGuard)
  async run(@Req() req: Request): Promise<any> {
    const userId = req.user['id'];

    return await this.queryBus.ask(new FindSuggestionsTermQuery(userId));
  }
}
