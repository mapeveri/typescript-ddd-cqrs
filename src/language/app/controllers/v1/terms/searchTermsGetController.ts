import SearchTermQuery from '@src/language/application/term/query/searchTermQuery';
import { Controller, Get, HttpCode, Inject, Param, Query, UseGuards } from '@nestjs/common';
import { NestJwtAuthGuard } from '@src/shared/infrastructure/auth/jwt/nestJwtAuthGuard';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TermViewsResponse } from './termViewsResponse';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/bus/queryBus/queryBus';
import { SearchTermsQueryParamsDto } from '@src/language/app/controllers/v1/terms/searchTermsQueryParamsDto';

@ApiTags('Terms')
@Controller()
export default class SearchTermsGetController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Get('search/:term')
  @HttpCode(200)
  @ApiOkResponse({ type: TermViewsResponse })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(NestJwtAuthGuard)
  async run(@Param('term') term: string, @Query() queryParams: SearchTermsQueryParamsDto): Promise<TermViewsResponse> {
    return await this.queryBus.ask(
      new SearchTermQuery(
        term,
        Number(queryParams.size),
        Number(queryParams.page),
        queryParams.orderBy,
        queryParams.orderType,
      ),
    );
  }
}
