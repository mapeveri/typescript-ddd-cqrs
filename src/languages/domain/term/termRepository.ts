import Term from './term';
import TermCriteria from '@src/languages/domain/term/termCriteria';

interface TermRepository {
  search(criteria: TermCriteria): Promise<Term[]>;

  save(term: Term): Promise<void>;
}

export default TermRepository;

export const TERM_REPOSITORY = Symbol('TermRepository');
