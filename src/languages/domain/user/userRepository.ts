import User from './user';

interface UserRepository {
  findByEmail(email: string): Promise<User | null>;

  findById(id: string): Promise<User | null>;

  save(user: User): Promise<void>;
}

export default UserRepository;
