import LoginPostController from '@src/languages/app/controllers/v1/auth/loginPostController';
import RefreshTokenPostController from '@src/languages/app/controllers/v1/auth/refreshTokenPostController';
import MeGetController from '@src/languages/app/controllers/v1/auth/meGetController';
import SearchTermsGetController from '@src/languages/app/controllers/v1/terms/searchTermsGetController';
import FindSuggestionsTermGetController from '@src/languages/app/controllers/v1/terms/findSuggestionsTermGetController';
import WordPostController from '@src/languages/app/controllers/v1/terms/words/wordPostController';
import ExpressionPostController from '@src/languages/app/controllers/v1/terms/expressions/expressionPostController';
import CountriesGetController from '@src/languages/app/controllers/v1/countries/countriesGetController';
import CountryGetController from '@src/languages/app/controllers/v1/countries/countryGetController';
import CountryPostController from '@src/languages/app/controllers/v1/countries/countryPostController';
import UserPutController from '@src/languages/app/controllers/v1/user/userPutController';
import { SearchTermsSseController } from '@src/languages/app/controllers/v1/terms/searchTermsSseController';
import { HealthController } from '@src/languages/app/controllers/v1/health/healthGetController';

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
  HealthController,
];
