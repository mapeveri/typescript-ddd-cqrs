import SearchTermsGetController from '@src/language/app/controllers/v1/terms/searchTermsGetController';
import FindSuggestionsTermGetController from '@src/language/app/controllers/v1/terms/findSuggestionsTermGetController';
import WordPostController from '@src/language/app/controllers/v1/terms/words/wordPostController';
import ExpressionPostController from '@src/language/app/controllers/v1/terms/expressions/expressionPostController';
import CountriesGetController from '@src/language/app/controllers/v1/countries/countriesGetController';
import CountryGetController from '@src/language/app/controllers/v1/countries/countryGetController';
import CountryPostController from '@src/language/app/controllers/v1/countries/countryPostController';
import { SearchTermsSseController } from '@src/language/app/controllers/v1/terms/searchTermsSseController';
import { HealthController } from '@src/language/app/controllers/v1/health/healthGetController';
import LikeTermPostController from '@src/language/app/controllers/v1/terms/likeTermPostController';
import DislikeTermPostController from '@src/language/app/controllers/v1/terms/dislikeTermPostController';
import WordPutController from '@src/language/app/controllers/v1/terms/words/wordPutController';
import TermGetController from '@src/language/app/controllers/v1/terms/termGetController';

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
