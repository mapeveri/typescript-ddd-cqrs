import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import TermRepository from '@src/languages/domain/term/termRepository';
import { TermSchema } from '../entities/term';
import Term from '@src/languages/domain/term/term';
import TermId from '@src/languages/domain/term/termId';

@Injectable()
export default class MikroOrmTermRepository implements TermRepository {
  private readonly em: EntityManager;

  constructor(
    @InjectRepository(TermSchema)
    private readonly termRepository: EntityRepository<Term>,
  ) {
    this.em = termRepository.getEntityManager();
  }

  async findById(id: TermId): Promise<Term | null> {
    return await this.termRepository.findOne(id);
  }

  async remove(term: Term): Promise<void> {
    await this.termRepository.nativeDelete(term);
  }

  save(term: Term): void {
    this.em.persist(term);
  }
}
