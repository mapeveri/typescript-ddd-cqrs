import { Router } from 'express';
import { ContainerBuilder } from 'node-dependency-injection';
import CountryGetController from '../controllers/countries/countryGetController';
import CountriesGetController from '../controllers/countries/countriesGetController';
import CountryPostController from '../controllers/countries/countryPostController';

export const registerLoginRequiredRoutes = (router: Router, container: ContainerBuilder) => {
  const countriesGetController: CountriesGetController = container.get(CountriesGetController);
  const countryGetController: CountryGetController = container.get(CountryGetController);
  const countryPostController: CountryPostController = container.get(CountryPostController);

  router.get('/countries/:id', countryGetController.run.bind(countryGetController));
  router.get('/countries', countriesGetController.run.bind(countriesGetController));
  router.post('/countries', countryPostController.run.bind(countryPostController));
};
