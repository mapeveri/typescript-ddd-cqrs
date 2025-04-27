import TermId from '@src/language/domain/term/termId';
import Term from '@src/language/domain/term/term';

interface TermRepository {
  findById(id: TermId): Promise<Term | null>;

  remove(term: Term): Promise<void>;

  save(term: Term): void;
}

export default TermRepository;

export const TERM_REPOSITORY = Symbol('TermRepository');
