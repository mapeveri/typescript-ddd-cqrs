import Email from '@src/shared/domain/valueObjects/email';
import User from './user';
import UserId from './userId';

interface UserRepository {
  findById(id: UserId): Promise<User | null>;

  findByEmail(email: Email): Promise<User | null>;

  save(user: User): void;
}

export default UserRepository;

export const USER_REPOSITORY = Symbol('UserRepository');
