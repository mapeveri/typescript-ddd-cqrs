import { beforeAll, describe, it, expect, vi } from 'vitest';
import UserGetController from '@src/account/app/controllers/v1/user/userGetController';
import { UserMother } from '@test/unit/account/domain/user/userMother';
import { QueryBus } from '@src/shared/domain/bus/queryBus/queryBus';

describe('Given a UserGetController to handle', () => {
  let sut: UserGetController;
  let queryBusMock: { ask: ReturnType<typeof vi.fn> };

  const prepareDependencies = () => {
    queryBusMock = {
      ask: vi.fn(),
    };
  };

  const initHandler = () => {
    sut = new UserGetController(queryBusMock as QueryBus);

    vi.useFakeTimers();
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
