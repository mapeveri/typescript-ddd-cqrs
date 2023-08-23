import FindCountriesQuery from '@src/languages/application/country/query/findAll/findCountriesQuery';
import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@src/shared/infrastructure/nestjs/guards/JwtAuthGuard';
import CountryGetResponseDto from './countryGetResponse';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';

@ApiTags('Countries')
@Controller()
export default class CountriesGetController {
  public constructor(private queryBus: QueryBus) {}

  @Get('countries')
  @HttpCode(200)
  @ApiOkResponse({ type: [CountryGetResponseDto] })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(JwtAuthGuard)
  async run(): Promise<CountryGetResponseDto[]> {
    const data = await this.queryBus.execute(new FindCountriesQuery());
    return data.content;
  }
}
