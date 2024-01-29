import TermView from './termView';
import TermViewCriteria from '@src/languages/application/term/query/termViewCriteria';

interface TermViewReadLayer {
  search(criteria: TermViewCriteria): Promise<TermView[]>;

  save(term: TermView): Promise<void>;
}

export default TermViewReadLayer;

export const TERM_VIEW_READ_LAYER = Symbol('TermViewReadLayer');
