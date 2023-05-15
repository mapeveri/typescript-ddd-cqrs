import User from './user';
import UserId from './valueObjects/userId';

interface UserRepository {
  findById(id: UserId): Promise<User | null>;

  save(user: User): Promise<void>;
}

export default UserRepository;
