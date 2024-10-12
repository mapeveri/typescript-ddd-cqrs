import { Injectable } from '@nestjs/common';
import AuthSession from '@src/languages/domain/auth/authSession';
import { AuthSessionRepository } from '@src/languages/domain/auth/authSessionRepository';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export default class MikroOrmAuthSessionRepository implements AuthSessionRepository {
  constructor(private readonly em: EntityManager) {}

  save(authSession: AuthSession): void {
    this.em.persist(authSession);
  }
}
