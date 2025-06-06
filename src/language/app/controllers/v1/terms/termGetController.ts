import { Controller, Get, HttpCode, Inject, Param, UseGuards } from '@nestjs/common';
import { NestJwtAuthGuard } from '@src/shared/infrastructure/auth/jwt/nestJwtAuthGuard';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/bus/queryBus/queryBus';
import FindTermQuery from '@src/language/application/term/query/findTermQuery';
import { TermResponse } from '@src/language/app/controllers/v1/terms/termResponse';

@ApiTags('Terms')
@Controller()
export default class TermGetController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Get('terms/:id')
  @HttpCode(200)
  @ApiOkResponse({ type: TermResponse })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(NestJwtAuthGuard)
  async run(@Param('id') id: string): Promise<TermResponse> {
    const response = await this.queryBus.ask(new FindTermQuery(id));
    return response.content;
  }
}
