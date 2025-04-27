import FindCountryQueryHandler from '@src/language/application/country/query/findCountryQueryHandler';
import FindCountriesQueryHandler from '@src/language/application/country/query/findCountriesQueryHandler';
import SearchTermQueryHandler from '@src/language/application/term/query/searchTermQueryHandler';
import FindSuggestionsTermQueryHandler from '@src/language/application/term/query/findSuggestionsTermQueryHandler';
import FindTermQueryHandler from '@src/language/application/term/query/findTermQueryHandler';

export const queries = [
  FindCountryQueryHandler,
  FindCountriesQueryHandler,
  SearchTermQueryHandler,
  FindSuggestionsTermQueryHandler,
  FindTermQueryHandler,
];
