import User from './user';
import UserId from './userId';

interface UserRepository {
  findById(id: UserId): Promise<User | null>;

  save(user: User): Promise<void>;
}

export default UserRepository;

export const USER_REPOSITORY = Symbol('UserRepository');
