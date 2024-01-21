import TermView from './termView';
import TermViewCriteria from '@src/languages/application/term/projection/termViewCriteria';

interface TermViewRepository {
  search(criteria: TermViewCriteria): Promise<TermView[]>;

  save(term: TermView): Promise<void>;
}

export default TermViewRepository;

export const TERM_REPOSITORY = Symbol('TermViewRepository');
