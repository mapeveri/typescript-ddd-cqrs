import FindCountryQuery from '@src/languages/application/country/query/find/findCountryQuery';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/buses/queryBus/queryBus';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@src/shared/infrastructure/nestjs/guards/JwtAuthGuard';

@Controller()
export default class CountryGetController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Get('countries/:id')
  @UseGuards(JwtAuthGuard)
  async run(@Param('id') id: string): Promise<any> {
    const data = await this.queryBus.ask(new FindCountryQuery(id));
    return data.content || {};
  }
}
