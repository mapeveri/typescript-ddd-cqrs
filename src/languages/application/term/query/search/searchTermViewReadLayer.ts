import TermView from '../../../../domain/term/termView';
import TermViewCriteria from '@src/languages/application/term/query/search/termViewCriteria';

interface SearchTermViewReadLayer {
  search(criteria: TermViewCriteria): Promise<TermView[]>;

  save(term: TermView): Promise<void>;
}

export default SearchTermViewReadLayer;

export const SEARCH_TERM_VIEW_READ_LAYER = Symbol('SearchTermViewReadLayer');
