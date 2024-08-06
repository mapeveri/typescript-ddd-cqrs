import { expect, jest } from '@jest/globals';
import User from '@src/languages/domain/user/user';
import UserRepository from '@src/languages/domain/user/userRepository';
import UserId from '@src/languages/domain/user/userId';
import Email from '@src/shared/domain/valueObjects/email';

export class UserRepositoryMock implements UserRepository {
  private saveMock: jest.Mock;
  private findByIdMock: jest.Mock;
  private findByEmailMock: jest.Mock;
  private users: User[];

  constructor() {
    this.findByIdMock = jest.fn();
    this.findByEmailMock = jest.fn();
    this.saveMock = jest.fn();
    this.users = [];
  }

  add(user: User): void {
    this.users.push(user);
  }

  clean(): void {
    this.findByIdMock = jest.fn();
    this.findByEmailMock = jest.fn();
    this.saveMock = jest.fn();
    this.users = [];
  }

  async findById(id: UserId): Promise<User | null> {
    this.findByIdMock(id);
    return this.users.length > 0 ? this.users[0] : null;
  }

  async findByEmail(email: Email): Promise<User | null> {
    this.findByEmailMock(email);
    return this.users.length > 0 ? this.users[0] : null;
  }

  expectFindById(id: UserId): void {
    expect(this.findByIdMock).toHaveBeenCalledWith(id);
  }

  expectFindByEmail(email: Email): void {
    expect(this.findByEmailMock).toHaveBeenCalledWith(email);
  }

  async save(user: User): Promise<any> {
    this.saveMock(user);
  }

  expectSaveHasBeenCalledWith(user: User): void {
    expect(this.saveMock).toHaveBeenCalledWith(user);
  }
}
