import { expect, jest } from '@jest/globals';
import User from '@src/languages/domain/user/user';
import UserRepository from '@src/languages/domain/user/userRepository';
import UserId from '@src/languages/domain/user/valueObjects/userId';

export class UserRepositoryMock implements UserRepository {
  private saveMock = jest.fn();
  private findByIdMock = jest.fn();
  private user: User;

  returnOnfindById(user: User): void {
    this.user = user;
  }

  async findById(id: UserId): Promise<User | null> {
    this.findByIdMock(id);
    return this.user;
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
