import { ContainerBuilder } from 'node-dependency-injection';

import MemoryQueryBus from './memoryQueryBus';
import FindCountryQueryHandler from '@src/languages/application/country/query/find/findCountryQueryHandler';
import FindUserQueryHandler from '@src/languages/application/user/query/find/findUserQueryHandler';
import FindCountriesQueryHandler from '@src/languages/application/country/query/findAll/findCountriesQueryHandler';
import FindCountryQuery from '@src/languages/application/country/query/find/findCountryQuery';
import FindCountriesQuery from '@src/languages/application/country/query/findAll/findCountriesQuery';
import FindUserQuery from '@src/languages/application/user/query/find/findUserQuery';
import SearchTermQuery from '@src/languages/application/term/query/search/searchTermQuery';
import SearchTermQueryHandler from '@src/languages/application/term/query/search/searchTermQueryHandler';

export function registerQueries(container: ContainerBuilder) {
  const queryBus: MemoryQueryBus = container.get(MemoryQueryBus);

  queryBus.register(FindCountryQuery.prototype, container.get(FindCountryQueryHandler));
  queryBus.register(FindCountriesQuery.prototype, container.get(FindCountriesQueryHandler));
  queryBus.register(FindUserQuery.prototype, container.get(FindUserQueryHandler));
  queryBus.register(SearchTermQuery.prototype, container.get(SearchTermQueryHandler));
}
