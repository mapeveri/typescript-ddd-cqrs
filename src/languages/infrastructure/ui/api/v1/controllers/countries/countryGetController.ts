import FindCountryQuery from '@src/languages/application/country/query/find/findCountryQuery';
import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
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
export default class CountryGetController {
  public constructor(private queryBus: QueryBus) {}

  @Get('countries/:id')
  @HttpCode(200)
  @ApiOkResponse({ type: CountryGetResponseDto })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(JwtAuthGuard)
  async run(@Param('id') id: string): Promise<CountryGetResponseDto> {
    const data = await this.queryBus.execute(new FindCountryQuery(id));
    return data.content || {};
  }
}
