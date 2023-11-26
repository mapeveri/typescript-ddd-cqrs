import Term from './term';

interface TermRepository {
  search(term: string): Promise<Term[]>;

  save(term: Term): Promise<void>;
}

export default TermRepository;

export const TERM_REPOSITORY = Symbol('TermRepository');
