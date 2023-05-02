import { Repository } from 'typeorm';
import User from '../../../../domain/user/user';
import UserEntity from '../entities/user';
import UserRepository from '../../../../domain/user/userRepository';
import AppDataSource from './../../../../../shared/infrastructure/persistence/typeOrm/dataSource';

export default class TypeOrmUserRepository implements UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.manager.getRepository(UserEntity);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOneBy({ email: email });
  }

  async findById(id: string): Promise<User | null> {
    return await this.repository.findOneBy({ id: id });
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }
}
