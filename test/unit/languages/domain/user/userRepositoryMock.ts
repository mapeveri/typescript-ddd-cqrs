import { expect, jest } from '@jest/globals';
import User from '@src/languages/domain/user/user';
import UserRepository from '@src/languages/domain/user/userRepository';
import UserId from '@src/languages/domain/user/userId';

export class UserRepositoryMock implements UserRepository {
  private saveMock: jest.Mock;
  private findByIdMock: jest.Mock;
  private users: User[];

  constructor() {
    this.findByIdMock = jest.fn();
    this.saveMock = jest.fn();
    this.users = [];
  }

  add(user: User): void {
    this.users.push(user);
  }

  async findById(id: UserId): Promise<User | null> {
    this.findByIdMock(id);
    return this.users.length > 0 ? this.users[0] : null;
  }

  expectFindById(id: UserId): void {
    expect(this.findByIdMock).toHaveBeenCalledWith(id);
  }

  async save(user: User): Promise<any> {
    this.saveMock(user);
  }

  expectSaveHasBeenCalledWith(user: User): void {
    expect(this.saveMock).toHaveBeenCalledWith(user);
  }
}
