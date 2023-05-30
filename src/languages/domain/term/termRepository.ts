import Term from './term';

interface TermRepository {
  search(term: string): Promise<Term[] | null>;

  save(term: Term): Promise<void>;
}

export default TermRepository;
