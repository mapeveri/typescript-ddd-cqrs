import UserRepository from '@src/account/domain/user/userRepository';
import User from '@src/account/domain/user/user';
import UserId from '@src/account/domain/user/userId';
import { Injectable } from '@nestjs/common';
import Email from '@src/shared/domain/valueObjects/email';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserSchema } from '../entities/user';

@Injectable()
export default class MikroOrmUserRepository implements UserRepository {
  private readonly em: EntityManager;

  constructor(
    @InjectRepository(UserSchema, 'account')
    private readonly userRepository: EntityRepository<User>,
  ) {
    this.em = userRepository.getEntityManager();
  }

  async findById(id: UserId): Promise<User | null> {
    return await this.userRepository.findOne(id);
  }

  async findByEmail(email: Email): Promise<User | null> {
    return await this.userRepository.findOne({ email: email });
  }

  save(user: User): void {
    this.em.persist(user);
  }
}
