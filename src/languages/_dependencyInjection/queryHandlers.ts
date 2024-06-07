import FindCountryQueryHandler from '@src/languages/application/country/query/findCountryQueryHandler';
import FindCountriesQueryHandler from '@src/languages/application/country/query/findCountriesQueryHandler';
import SearchTermQueryHandler from '@src/languages/application/term/query/search/searchTermQueryHandler';
import FindUserQueryHandler from '@src/languages/application/user/query/find/findUserQueryHandler';
import FindSuggestionsTermQueryHandler from '@src/languages/application/term/query/suggestion/findSuggestionsTermQueryHandler';

export const queries = [
  FindCountryQueryHandler,
  FindCountriesQueryHandler,
  SearchTermQueryHandler,
  FindUserQueryHandler,
  FindSuggestionsTermQueryHandler,
];
