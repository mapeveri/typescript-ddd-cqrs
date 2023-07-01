import UserRepository from '@src/languages/domain/user/userRepository';
import User from '@src/languages/domain/user/user';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import TypeOrmRepository from '@src/shared/infrastructure/persistence/typeOrm/typeOrmRepository';

export default class TypeOrmUserRepository extends TypeOrmRepository implements UserRepository {
  constructor() {
    super();
  }

  async findById(id: UserId): Promise<User | null> {
    return await this.em.findOne(User, { where: { id: id } } as any);
  }

  async save(user: User): Promise<void> {
    await this.em.save(user);
  }
}
