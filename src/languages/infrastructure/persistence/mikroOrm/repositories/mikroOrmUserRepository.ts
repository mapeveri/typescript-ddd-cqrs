import UserRepository from '@src/languages/domain/user/userRepository';
import User from '@src/languages/domain/user/user';
import UserId from '@src/languages/domain/user/userId';
import { Injectable } from '@nestjs/common';
import Email from '@src/shared/domain/valueObjects/email';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserSchema } from '../entities/user';

@Injectable()
export default class MikroOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async findById(id: UserId): Promise<User | null> {
    return await this.userRepository.findOne(id);
  }

  async findByEmail(email: Email): Promise<User | null> {
    return await this.userRepository.findOne({ email: email });
  }

  async save(user: User): Promise<void> {
    await this.userRepository.upsert(user);
  }
}
