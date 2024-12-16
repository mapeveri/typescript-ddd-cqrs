import FindCountryQueryHandler from '@src/languages/application/country/query/findCountryQueryHandler';
import FindCountriesQueryHandler from '@src/languages/application/country/query/findCountriesQueryHandler';
import SearchTermQueryHandler from '@src/languages/application/term/query/searchTermQueryHandler';
import FindSuggestionsTermQueryHandler from '@src/languages/application/term/query/findSuggestionsTermQueryHandler';
import FindTermQueryHandler from '@src/languages/application/term/query/findTermQueryHandler';

export const queries = [
  FindCountryQueryHandler,
  FindCountriesQueryHandler,
  SearchTermQueryHandler,
  FindSuggestionsTermQueryHandler,
  FindTermQueryHandler,
];
