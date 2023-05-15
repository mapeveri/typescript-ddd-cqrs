import User from './user';

interface UserRepository {
  findById(id: string): Promise<User | null>;

  save(user: User): Promise<void>;
}

export default UserRepository;
