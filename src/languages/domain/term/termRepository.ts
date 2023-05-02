import TermInterface from './termInterface';

interface TermRepository {
  search(text: string): Promise<TermInterface[] | null>;
}

export default TermRepository;
