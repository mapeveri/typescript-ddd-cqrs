import FindCountriesQuery from '@src/languages/application/country/query/findAll/findCountriesQuery';
import { Controller, Get, HttpCode, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@src/api/guards/jwtAuthGuard';
import CountryGetResponseDto from './countryGetResponse';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/buses/queryBus/queryBus';

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
  @UseGuards(JwtAuthGuard)
  async run(): Promise<CountryGetResponseDto[]> {
    const data = await this.queryBus.ask(new FindCountriesQuery());
    return data.content;
  }
}
