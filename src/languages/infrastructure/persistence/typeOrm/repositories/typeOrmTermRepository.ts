import TermInterface from '../../../../domain/term/termInterface';
import TermRepository from '../../../../domain/term/termRepository';

export default class TypeOrmTermRepository implements TermRepository {
  async search(text: string): Promise<TermInterface[] | null> {
    const result: TermInterface[] = [];
    console.log(text);
    return result;
  }
}
