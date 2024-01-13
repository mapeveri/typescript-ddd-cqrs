import SearchTermQuery from '@src/languages/application/term/query/search/searchTermQuery';
import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NestJwtAuthGuard } from '@src/shared/infrastructure/api/guards/nestJwtAuthGuard';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TermsResponse } from './termsResponse';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/bus/queryBus/queryBus';

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
  async run(
    @Param('term') term: string,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('orderBy') orderBy: string,
    @Query('orderType') orderType: string,
  ): Promise<any> {
    return await this.queryBus.ask(new SearchTermQuery(term, size, page, orderBy, orderType));
  }
}
