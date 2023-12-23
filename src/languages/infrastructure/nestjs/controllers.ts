import LoginPostController from '../ui/api/v1/controllers/auth/loginPostController';
import MeGetController from '../ui/api/v1/controllers/auth/meGetController';
import SearchTermsGetController from '../ui/api/v1/controllers/terms/searchTermsGetController';
import WordPostController from '../ui/api/v1/controllers/words/wordPostController';
import ExpressionPostController from '../ui/api/v1/controllers/expressions/expressionPostController';
import CountriesGetController from '../ui/api/v1/controllers/countries/countriesGetController';
import CountryGetController from '../ui/api/v1/controllers/countries/countryGetController';
import CountryPostController from '../ui/api/v1/controllers/countries/countryPostController';
import RefreshTokenPostController from '../ui/api/v1/controllers/auth/refreshTokenPostController';
import FindSuggestionsTermController from '@src/languages/infrastructure/ui/api/v1/controllers/terms/findSuggestionsTermController';
import UserPutController from '@src/languages/infrastructure/ui/api/v1/controllers/user/userPutController';

export const controllers = [
  LoginPostController,
  RefreshTokenPostController,
  MeGetController,
  SearchTermsGetController,
  FindSuggestionsTermController,
  WordPostController,
  ExpressionPostController,
  CountriesGetController,
  CountryGetController,
  CountryPostController,
  UserPutController,
];
