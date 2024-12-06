import { beforeAll, describe, it, expect, jest } from '@jest/globals';
import SignupPostController from '@src/languages/app/controllers/v1/auth/signupPostController';
import { CommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import { SignupUserCommandMother } from '@test/unit/languages/application/auth/command/signupUserCommandMother';

describe('Given a SignupPostController to handle', () => {
  let sut: SignupPostController;
  let commandBusMock: { dispatch: jest.Mock };

  const prepareDependencies = () => {
    commandBusMock = {
      dispatch: jest.fn(),
    };
  };

  const initHandler = () => {
    sut = new SignupPostController(commandBusMock as CommandBus);

    jest.useFakeTimers();
  };

  beforeAll(() => {
    prepareDependencies();
    initHandler();
  });

  describe('When received a request', () => {
    it('should create an user', async () => {
      const data = {
        email: 'test@test.com',
        name: 'test',
        token: '123',
        provider: 'google',
        photo: '',
      };
      await sut.run(data);

      expect(commandBusMock.dispatch).toHaveBeenCalledWith(
        SignupUserCommandMother.random({
          id: '4a4df157-8ab8-50af-bb39-88e8ce29eb16',
          email: data.email,
          name: data.name,
          token: data.token,
          provider: data.provider,
          photo: data.photo,
        }),
      );
      expect(commandBusMock.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
