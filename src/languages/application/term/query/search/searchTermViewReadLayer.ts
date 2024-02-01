import TermView from '../../viewModel/termView';
import TermViewCriteria from '@src/languages/application/term/query/search/termViewCriteria';

interface SearchTermViewReadLayer {
  search(criteria: TermViewCriteria): Promise<TermView[]>;
}

export default SearchTermViewReadLayer;

export const SEARCH_TERM_VIEW_READ_LAYER = Symbol('SearchTermViewReadLayer');
