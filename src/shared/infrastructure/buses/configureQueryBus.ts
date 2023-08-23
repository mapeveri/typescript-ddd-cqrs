import SearchTermQuery from '@src/languages/application/term/query/search/searchTermQuery';
import SearchTermQueryHandler from '@src/languages/application/term/query/search/searchTermQueryHandler';
import { NestFactory } from '@nestjs/core';
import { QUERY_BUS } from '@src/shared/domain/buses/queryBus/queryBus';
import { AppModule } from '@src/app.module';

export async function configureQueryBus() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const queryBus = app.get(QUERY_BUS);

  queryBus.register(SearchTermQuery.prototype, app.get(SearchTermQueryHandler));
}
