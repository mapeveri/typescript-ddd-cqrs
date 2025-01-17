import SearchTermsGetController from '@src/languages/app/controllers/v1/terms/searchTermsGetController';
import FindSuggestionsTermGetController from '@src/languages/app/controllers/v1/terms/findSuggestionsTermGetController';
import WordPostController from '@src/languages/app/controllers/v1/terms/words/wordPostController';
import ExpressionPostController from '@src/languages/app/controllers/v1/terms/expressions/expressionPostController';
import CountriesGetController from '@src/languages/app/controllers/v1/countries/countriesGetController';
import CountryGetController from '@src/languages/app/controllers/v1/countries/countryGetController';
import CountryPostController from '@src/languages/app/controllers/v1/countries/countryPostController';
import { SearchTermsSseController } from '@src/languages/app/controllers/v1/terms/searchTermsSseController';
import { HealthController } from '@src/languages/app/controllers/v1/health/healthGetController';
import LikeTermPostController from '@src/languages/app/controllers/v1/terms/likeTermPostController';
import DislikeTermPostController from '@src/languages/app/controllers/v1/terms/dislikeTermPostController';
import WordPutController from '@src/languages/app/controllers/v1/terms/words/wordPutController';
import TermGetController from '@src/languages/app/controllers/v1/terms/termGetController';

export const controllers = [
  SearchTermsGetController,
  FindSuggestionsTermGetController,
  TermGetController,
  WordPostController,
  ExpressionPostController,
  CountriesGetController,
  CountryGetController,
  CountryPostController,
  SearchTermsSseController,
  HealthController,
  LikeTermPostController,
  DislikeTermPostController,
  WordPutController,
];
