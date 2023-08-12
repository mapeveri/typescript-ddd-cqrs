import FindCountriesQuery from '@src/languages/application/country/query/findAll/findCountriesQuery';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/buses/queryBus/queryBus';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { Controller, Get } from '@nestjs/common';

@Controller()
export default class CountriesGetController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Get('countries')
  async run(): Promise<any> {
    const data = await this.queryBus.ask(new FindCountriesQuery());
    return data.content;
  }
}
