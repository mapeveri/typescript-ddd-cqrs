import FindCountriesQuery from '@src/languages/application/country/query/findCountriesQuery';
import { Controller, Get, HttpCode, Inject, UseGuards } from '@nestjs/common';
import { NestJwtAuthGuard } from '@src/shared/infrastructure/auth/jwt/nestJwtAuthGuard';
import CountryGetResponseDto from './countryGetResponse';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/bus/queryBus/queryBus';

@ApiTags('Countries')
@Controller()
export default class CountriesGetController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Get('countries')
  @HttpCode(200)
  @ApiOkResponse({ type: [CountryGetResponseDto] })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(NestJwtAuthGuard)
  async run(): Promise<CountryGetResponseDto[]> {
    const data = await this.queryBus.ask(new FindCountriesQuery());
    return data.content;
  }
}
