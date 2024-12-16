import { beforeAll, describe, it, expect, jest } from '@jest/globals';
import UserGetController from '@src/account/app/controllers/v1/user/userGetController';
import { UserMother } from '@test/unit/account/domain/user/userMother';
import { QueryBus } from '@src/shared/domain/bus/queryBus/queryBus';

describe('Given a UserGetController to handle', () => {
  let sut: UserGetController;
  let queryBusMock: { ask: jest.Mock };

  const prepareDependencies = () => {
    queryBusMock = {
      ask: jest.fn(),
    };
  };

  const initHandler = () => {
    sut = new UserGetController(queryBusMock as QueryBus);

    jest.useFakeTimers();
  };

  beforeAll(() => {
    prepareDependencies();
    initHandler();
  });

  describe('When received a request', () => {
    const user = UserMother.random().toPrimitives();

    it('should return a user', async () => {
      queryBusMock.ask.mockReturnValue({ content: user });
      const response = await sut.run(user.id);

      expect(response).toEqual(user);
    });
  });
});
