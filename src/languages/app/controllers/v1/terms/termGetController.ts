import { Controller, Get, HttpCode, Inject, Param, UseGuards } from '@nestjs/common';
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
import FindTermQuery from '@src/languages/application/term/query/findTermQuery';

@ApiTags('Terms')
@Controller()
export default class TermGetController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Get('terms/:id')
  @HttpCode(200)
  @ApiOkResponse({ type: TermViewsResponse })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(NestJwtAuthGuard)
  async run(@Param('id') id: string): Promise<unknown> {
    const response = await this.queryBus.ask(new FindTermQuery(id));
    return response.content || {};
  }
}
