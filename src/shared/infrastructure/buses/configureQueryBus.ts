import FindCountryQueryHandler from '@src/languages/application/country/query/find/findCountryQueryHandler';
import FindUserQueryHandler from '@src/languages/application/user/query/find/findUserQueryHandler';
import FindCountriesQueryHandler from '@src/languages/application/country/query/findAll/findCountriesQueryHandler';
import FindCountryQuery from '@src/languages/application/country/query/find/findCountryQuery';
import FindCountriesQuery from '@src/languages/application/country/query/findAll/findCountriesQuery';
import FindUserQuery from '@src/languages/application/user/query/find/findUserQuery';
import SearchTermQuery from '@src/languages/application/term/query/search/searchTermQuery';
import SearchTermQueryHandler from '@src/languages/application/term/query/search/searchTermQueryHandler';
import { NestFactory } from '@nestjs/core';
import { QUERY_BUS } from '@src/shared/domain/buses/queryBus/queryBus';
import { AppModule } from '@src/app.module';

export async function configureQueryBus() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const queryBus = app.get(QUERY_BUS);

  queryBus.register(FindCountryQuery.prototype, app.get(FindCountryQueryHandler));
  queryBus.register(FindCountriesQuery.prototype, app.get(FindCountriesQueryHandler));
  queryBus.register(FindUserQuery.prototype, app.get(FindUserQueryHandler));
  queryBus.register(SearchTermQuery.prototype, app.get(SearchTermQueryHandler));
}
