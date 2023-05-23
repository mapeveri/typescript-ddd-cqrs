import { ContainerBuilder } from 'node-dependency-injection';

import MemoryQueryBus from './memoryQueryBus';
import FindCountryQueryHandler from '../../../languages/application/country/query/find/findCountryQueryHandler';
import FindUserQueryHandler from '../../../languages/application/user/query/find/findUserQueryHandler';
import FindCountriesQueryHandler from '../../../languages/application/country/query/findAll/findCountriesQueryHandler';
import FindCountryQuery from '../../../languages/application/country/query/find/findCountryQuery';
import FindCountriesQuery from '../../../languages/application/country/query/findAll/findCountriesQuery';
import FindUserQuery from '../../../languages/application/user/query/find/findUserQuery';

export function registerQueries(container: ContainerBuilder) {
  const queryBus: MemoryQueryBus = container.get(MemoryQueryBus);

  queryBus.register(FindCountryQuery.prototype, container.get(FindCountryQueryHandler));
  queryBus.register(FindCountriesQuery.prototype, container.get(FindCountriesQueryHandler));
  queryBus.register(FindUserQuery.prototype, container.get(FindUserQueryHandler));
}
