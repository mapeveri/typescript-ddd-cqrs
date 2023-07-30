import { Router } from 'express';
import CountryGetController from '../controllers/countries/countryGetController';
import CountriesGetController from '../controllers/countries/countriesGetController';
import CountryPostController from '../controllers/countries/countryPostController';
import { INestApplicationContext } from '@nestjs/common';

export const registerLoginRequiredRoutes = (router: Router, app: INestApplicationContext) => {
  const countriesGetController: CountriesGetController = app.get(CountriesGetController);
  const countryGetController: CountryGetController = app.get(CountryGetController);
  const countryPostController: CountryPostController = app.get(CountryPostController);

  router.get('/countries/:id', countryGetController.run.bind(countryGetController));
  router.get('/countries', countriesGetController.run.bind(countriesGetController));
  router.post('/countries', countryPostController.run.bind(countryPostController));
};
