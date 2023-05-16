import { Repository } from 'typeorm';
import User from '../../../../domain/user/user';
import UserEntity from '../entities/user';
import UserRepository from '../../../../domain/user/userRepository';
import AppDataSource from './../../../../../shared/infrastructure/persistence/typeOrm/dataSource';
import UserId from '../../../../domain/user/valueObjects/userId';

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
