import { Injectable } from '@nestjs/common';
import AuthSession from '@src/languages/domain/auth/authSession';
import { AuthSessionRepository } from '@src/languages/domain/auth/authSessionRepository';
import { AuthSessionSchema } from '../entities/authSession';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export default class MikroOrmAuthSessionRepository implements AuthSessionRepository {
  constructor(
    @InjectRepository(AuthSessionSchema)
    private readonly authSessionRepository: EntityRepository<AuthSession>,
  ) {}

  async save(authSession: AuthSession): Promise<any> {
    return await this.authSessionRepository.upsert(authSession);
  }
}
