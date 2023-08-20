import FindCountriesQuery from '@src/languages/application/country/query/findAll/findCountriesQuery';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/buses/queryBus/queryBus';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@src/shared/infrastructure/nestjs/guards/JwtAuthGuard';
import CountryGetResponseDto from './countryGetResponse';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Countries')
@Controller()
export default class CountriesGetController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Get('countries')
  @HttpCode(200)
  @ApiOkResponse({ type: [CountryGetResponseDto] })
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiResponse({ status: 500, description: 'Internal Server Error.'})
  @UseGuards(JwtAuthGuard)
  async run(): Promise<CountryGetResponseDto[]> {
    const data = await this.queryBus.ask(new FindCountriesQuery());
    return data.content;
  }
}
