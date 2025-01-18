import { beforeAll, beforeEach, describe, it, expect, jest } from '@jest/globals';
import SignupPostController from '@src/account/app/controllers/v1/auth/signupPostController';
import { CommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import { SignUpUserCommandMother } from '@test/unit/account/application/auth/command/signUpUserCommandMother';
import { IdentityProviderMock } from '@test/unit/shared/domain/services/IdentityProviderMock';

describe('Given a SignupPostController to handle', () => {
  let sut: SignupPostController;
  let identityProvider: IdentityProviderMock;
  let commandBusMock: { dispatch: jest.Mock };

  const prepareDependencies = () => {
    identityProvider = new IdentityProviderMock();

    commandBusMock = {
      dispatch: jest.fn(),
    };
  };

  const initHandler = () => {
    sut = new SignupPostController(commandBusMock as CommandBus, identityProvider);

    jest.useFakeTimers();
  };

  const clean = () => {
    identityProvider.clean();
  };

  beforeAll(() => {
    prepareDependencies();
    initHandler();
    clean();
  });

  describe('When received a request', () => {
    function startScenario() {
      identityProvider.add('4a4df157-8ab8-50af-bb39-88e8ce29eb16');
    }

    beforeEach(startScenario);

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
        SignUpUserCommandMother.random({
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
