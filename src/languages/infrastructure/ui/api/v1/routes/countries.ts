import { Router } from 'express';
import { CountryGetController } from '../controllers/countries/countryGetController';
import { CountriesGetController } from '../controllers/countries/countriesGetController';
import { CountryPostController } from '../controllers/countries/countryPostController';

export const register = (router: Router) => {
  const countriesGetController: CountriesGetController = new CountriesGetController();
  const countryGetController: CountryGetController = new CountryGetController();
  const countryPostController: CountryPostController = new CountryPostController();

  router.get('/countries/:id', countryGetController.run.bind(countryGetController));
  router.get('/countries', countriesGetController.run.bind(countriesGetController));
  router.post('/countries', countryPostController.run.bind(countryPostController));
};
