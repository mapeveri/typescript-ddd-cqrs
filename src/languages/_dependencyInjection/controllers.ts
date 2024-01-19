import LoginPostController from '@src/languages/infrastructure/api/v1/controllers/auth/loginPostController';
import RefreshTokenPostController from '@src/languages/infrastructure/api/v1/controllers/auth/refreshTokenPostController';
import MeGetController from '@src/languages/infrastructure/api/v1/controllers/auth/meGetController';
import SearchTermsGetController from '@src/languages/infrastructure/api/v1/controllers/terms/searchTermsGetController';
import FindSuggestionsTermGetController from '@src/languages/infrastructure/api/v1/controllers/terms/findSuggestionsTermGetController';
import WordPostController from '@src/languages/infrastructure/api/v1/controllers/words/wordPostController';
import ExpressionPostController from '@src/languages/infrastructure/api/v1/controllers/expressions/expressionPostController';
import CountriesGetController from '@src/languages/infrastructure/api/v1/controllers/countries/countriesGetController';
import CountryGetController from '@src/languages/infrastructure/api/v1/controllers/countries/countryGetController';
import CountryPostController from '@src/languages/infrastructure/api/v1/controllers/countries/countryPostController';
import UserPutController from '@src/languages/infrastructure/api/v1/controllers/user/userPutController';
import { SearchTermsSseController } from '@src/languages/infrastructure/api/v1/controllers/terms/searchTermsSseController';

export const controllers = [
  LoginPostController,
  RefreshTokenPostController,
  MeGetController,
  SearchTermsGetController,
  FindSuggestionsTermGetController,
  WordPostController,
  ExpressionPostController,
  CountriesGetController,
  CountryGetController,
  CountryPostController,
  UserPutController,
  SearchTermsSseController,
];
