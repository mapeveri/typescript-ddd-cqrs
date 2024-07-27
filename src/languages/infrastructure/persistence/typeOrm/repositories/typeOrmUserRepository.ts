import UserRepository from '@src/languages/domain/user/userRepository';
import User from '@src/languages/domain/user/user';
import UserId from '@src/languages/domain/user/userId';
import TypeOrmRepository from '@src/shared/infrastructure/persistence/typeOrm/typeOrmRepository';
import { Injectable } from '@nestjs/common';
import Email from '@src/shared/domain/valueObjects/email';

@Injectable()
export default class TypeOrmUserRepository extends TypeOrmRepository implements UserRepository {
  async findById(id: UserId): Promise<User | null> {
    return await this.em.findOne(User, { where: { id: id } } as any);
  }

  async findByEmail(email: Email): Promise<User | null> {
    return await this.em.findOne(User, { where: { email: email } } as any);
  }

  async save(user: User): Promise<void> {
    await this.em.save(user);
  }
}
