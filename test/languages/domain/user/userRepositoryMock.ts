import { expect, jest } from '@jest/globals';
import User from '@src/languages/domain/user/user';
import UserRepository from '@src/languages/domain/user/userRepository';
import UserId from '@src/languages/domain/user/valueObjects/userId';

export class UserRepositoryMock implements UserRepository {
  private mockSave = jest.fn();
  private mockFindById = jest.fn();
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  async findById(id: UserId): Promise<User | null> {
    const user = this.users.filter((user) => user.id.equals(id))[0];
    this.mockFindById(user.id);
    return Promise.resolve(user);
  }

  assertFindById(id: UserId): void {
    expect(this.mockFindById).toHaveBeenCalledWith(id);
  }

  async save(user: User): Promise<any> {
    this.mockSave(user);
  }

  assertSaveHasBeenCalledWith(user: User): void {
    expect(this.mockSave).toHaveBeenCalledWith(user);
  }
}
