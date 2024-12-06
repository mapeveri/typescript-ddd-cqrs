import FindCountryQueryHandler from '@src/languages/application/country/query/findCountryQueryHandler';
import FindCountriesQueryHandler from '@src/languages/application/country/query/findCountriesQueryHandler';
import SearchTermQueryHandler from '@src/languages/application/term/query/searchTermQueryHandler';
import FindUserQueryHandler from '@src/languages/application/user/query/findUserQueryHandler';
import FindSuggestionsTermQueryHandler from '@src/languages/application/term/query/findSuggestionsTermQueryHandler';
import FindTermQueryHandler from '@src/languages/application/term/query/findTermQueryHandler';
import GetUserLoginQueryHandler from '@src/languages/application/auth/query/getUserLoginQueryHandler';

export const queries = [
  GetUserLoginQueryHandler,
  FindCountryQueryHandler,
  FindCountriesQueryHandler,
  SearchTermQueryHandler,
  FindUserQueryHandler,
  FindSuggestionsTermQueryHandler,
  FindTermQueryHandler,
];
