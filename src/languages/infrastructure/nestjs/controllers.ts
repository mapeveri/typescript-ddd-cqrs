import LoginPostController from '../ui/api/v1/controllers/auth/loginPostController';
import MeGetController from '../ui/api/v1/controllers/auth/meGetController';
import SearchTermsGetController from '../ui/api/v1/controllers/terms/searchTermsGetController';
import WordPostController from '../ui/api/v1/controllers/words/wordPostController';
import ExpressionPostController from '../ui/api/v1/controllers/expressions/expressionPostController';
import CountriesGetController from '../ui/api/v1/controllers/countries/countriesGetController';
import CountryGetController from '../ui/api/v1/controllers/countries/countryGetController';
import CountryPostController from '../ui/api/v1/controllers/countries/countryPostController';
import RefreshTokenPostController from '../ui/api/v1/controllers/auth/refreshTokenPostController';

export const controllers = [
  LoginPostController,
  RefreshTokenPostController,
  MeGetController,
  SearchTermsGetController,
  WordPostController,
  ExpressionPostController,
  CountriesGetController,
  CountryGetController,
  CountryPostController,
];
