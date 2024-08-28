import { Injectable } from '@nestjs/common';
import AuthSession from '@src/languages/domain/auth/authSession';
import { AuthSessionRepository } from '@src/languages/domain/auth/authSessionRepository';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export default class MikroOrmAuthSessionRepository implements AuthSessionRepository {
  constructor(private readonly em: EntityManager) {}

  async save(authSession: AuthSession): Promise<any> {
    return await this.em.upsert(authSession);
  }
}
