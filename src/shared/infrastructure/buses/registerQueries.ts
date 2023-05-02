import { ContainerBuilder } from 'node-dependency-injection';

import MemoryQueryBus from './memoryQueryBus';
import FindCountryQuery from '../../../languages/application/country/query/find/findCountryQuery';
import FindCountriesQuery from '../../../languages/application/country/query/findAll/findCountriesQuery';
import FindUserQuery from '../../../languages/application/user/query/find/findUserQuery';

export function registerQueries(container: ContainerBuilder) {
  const queryBus: MemoryQueryBus = container.get('Shared.QueryBus');

  queryBus.register(FindCountryQuery.prototype, container.get('Countries.FindCountryQueryHandler'));
  queryBus.register(FindCountriesQuery.prototype, container.get('Countries.FindCountriesQueryHandler'));
  queryBus.register(FindUserQuery.prototype, container.get('Users.FindUserQueryHandler'));
}
