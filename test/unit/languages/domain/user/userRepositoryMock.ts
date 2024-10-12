import User from '@src/languages/domain/user/user';
import UserRepository from '@src/languages/domain/user/userRepository';
import UserId from '@src/languages/domain/user/userId';
import Email from '@src/shared/domain/valueObjects/email';

export class UserRepositoryMock implements UserRepository {
  private users: User[];
  private changed: boolean = false;
  private usersStored: User[];

  constructor() {
    this.changed = false;
    this.usersStored = [];
    this.users = [];
  }

  add(user: User): void {
    this.users.push(user);
  }

  stored(): User[] {
    return this.usersStored;
  }

  storedChanged(): boolean {
    return this.changed;
  }

  clean(): void {
    this.changed = false;
    this.usersStored = [];
    this.users = [];
  }

  async findById(_id: UserId): Promise<User | null> {
    const user = this.users.length > 0 ? this.users[0] : null;

    return Promise.resolve(user);
  }

  async findByEmail(_email: Email): Promise<User | null> {
    const user = this.users.length > 0 ? this.users[0] : null;

    return Promise.resolve(user);
  }

  save(user: User): void {
    this.changed = true;
    this.usersStored.push(user);
  }
}
