import LoginPostController from '@src/api/v1/controllers/auth/loginPostController';
import RefreshTokenPostController from '@src/api/v1/controllers/auth/refreshTokenPostController';
import MeGetController from '@src/api/v1/controllers/auth/meGetController';
import SearchTermsGetController from '@src/api/v1/controllers/terms/searchTermsGetController';
import FindSuggestionsTermController from '@src/api/v1/controllers/terms/findSuggestionsTermController';
import WordPostController from '@src/api/v1/controllers/words/wordPostController';
import ExpressionPostController from '@src/api/v1/controllers/expressions/expressionPostController';
import CountriesGetController from '@src/api/v1/controllers/countries/countriesGetController';
import CountryGetController from '@src/api/v1/controllers/countries/countryGetController';
import CountryPostController from '@src/api/v1/controllers/countries/countryPostController';
import UserPutController from '@src/api/v1/controllers/user/userPutController';
import { NotificationsSseController } from '@src/api/sse/notificationsSseController';

export const controllers = [
  NotificationsSseController,
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
