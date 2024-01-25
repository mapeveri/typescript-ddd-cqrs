import TypeOrmRepository from '@src/shared/infrastructure/persistence/typeOrm/typeOrmRepository';
import { Injectable } from '@nestjs/common';
import TermRepository from '@src/languages/domain/term/termRepository';
import TermId from '@src/languages/domain/term/termId';
import Term from '@src/languages/domain/term/term';

@Injectable()
export default class TypeOrmTermRepository extends TypeOrmRepository implements TermRepository {
  constructor() {
    super();
  }

  async findById(id: TermId): Promise<Term | null> {
    return await this.em.findOne(Term, { where: { id: id } } as any);
  }

  async remove(term: Term): Promise<void> {
    await this.em.remove(term);
  }

  async save(term: Term): Promise<any> {
    return await this.em.save(term);
  }
}
