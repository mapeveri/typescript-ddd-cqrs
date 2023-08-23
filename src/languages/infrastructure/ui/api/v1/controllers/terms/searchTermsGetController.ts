import SearchTermQuery from '@src/languages/application/term/query/search/searchTermQuery';
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
import { QueryBus } from '@nestjs/cqrs';

@ApiTags('Terms')
@Controller()
export default class SearchTermsGetController {
  public constructor(private queryBus: QueryBus) {}

  @Get('search/:term')
  @HttpCode(200)
  @ApiOkResponse({ type: SearchTermsGetResponse })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(JwtAuthGuard)
  async run(@Param('term') term: string): Promise<any> {
    return await this.queryBus.execute(new SearchTermQuery(term));
  }
}
