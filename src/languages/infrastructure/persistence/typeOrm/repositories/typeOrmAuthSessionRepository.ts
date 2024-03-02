import { Injectable } from '@nestjs/common';
import AuthSession from '@src/languages/domain/auth/authSession';
import { AuthSessionRepository } from '@src/languages/domain/auth/authSessionRepository';
import TypeOrmRepository from '@src/shared/infrastructure/persistence/typeOrm/typeOrmRepository';

@Injectable()
export default class TypeOrmAuthSessionRepository extends TypeOrmRepository implements AuthSessionRepository {
  async save(authSession: AuthSession): Promise<any> {
    return await this.em.save(authSession);
  }
}
