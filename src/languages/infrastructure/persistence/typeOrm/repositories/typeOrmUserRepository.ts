import { Repository } from 'typeorm';
import UserEntity from '../entities/user';
import AppDataSource from '@src/shared/infrastructure/persistence/typeOrm/dataSource';
import UserRepository from '@src/languages/domain/user/userRepository';
import User from '@src/languages/domain/user/user';
import UserId from '@src/languages/domain/user/valueObjects/userId';

export default class TypeOrmUserRepository implements UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.manager.getRepository(UserEntity);
  }

  async findById(id: UserId): Promise<User | null> {
    return await this.repository.findOne({ where: { id: id as any } });
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }
}
