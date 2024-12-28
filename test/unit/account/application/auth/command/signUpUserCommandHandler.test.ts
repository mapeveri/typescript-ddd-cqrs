import { beforeEach, beforeAll, describe, expect, it, jest } from '@jest/globals';
import { EventBusMock } from '@test/unit/shared/domain/buses/eventBus/eventBusMock';
import SignUpUserCommandHandler from '@src/account/application/auth/command/signUpUserCommandHandler';
import { SignUpUserCommandMother } from '@test/unit/account/application/auth/command/signUpUserCommandMother';
import SignUpUserCommand from '@src/account/application/auth/command/signUpUserCommand';
import { UserRepositoryMock } from '@test/unit/account/domain/user/userRepositoryMock';
import { UserMother } from '@test/unit/account/domain/user/userMother';
import UserAlreadyExistsException from '@src/account/domain/user/userAlreadyExistsException';
import { UserIdMother } from '@test/unit/account/domain/user/userIdMother';
import UserSignedUpEvent from '@src/account/domain/user/userSignedUpEvent';
import { UserSignedUpEventMother } from '@test/unit/account/domain/user/userSignedUpEventMother';

describe('Given a SignUpUserCommandHandler to handle', () => {
  let userRepository: UserRepositoryMock;
  let eventBus: EventBusMock;
  let handler: SignUpUserCommandHandler;

  const prepareDependencies = () => {
    userRepository = new UserRepositoryMock();
    eventBus = new EventBusMock();
  };

  const initHandler = () => {
    handler = new SignUpUserCommandHandler(userRepository, eventBus);

    jest.useFakeTimers();
  };

  const clean = () => {
    userRepository.clean();
    eventBus.clean();
  };

  beforeAll(() => {
    prepareDependencies();
    initHandler();
  });

  beforeEach(() => {
    clean();
  });

  describe('When the user already exists', () => {
    let command: SignUpUserCommand;

    function startScenario() {
      command = SignUpUserCommandMother.random();
      userRepository.add(UserMother.random({ id: UserIdMother.random(command.id) }));
    }

    beforeEach(startScenario);

    it('should raise an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(UserAlreadyExistsException);

      expect(userRepository.storedChanged()).toBeFalsy();
      expect(userRepository.stored()).toHaveLength(0);
    });

    it('should not publish any events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(UserAlreadyExistsException);

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When the user does not exists', () => {
    let data: { id: string; email: string; provider: string; photo: string; name: string };
    let command: SignUpUserCommand;

    function startScenario() {
      data = {
        id: '4a4df157-8ab8-50af-bb39-88e8ce29eb16',
        email: 'test@test.com',
        provider: 'google',
        photo: '',
        name: 'test',
      };
      command = SignUpUserCommandMother.random(data);
    }

    beforeEach(startScenario);

    it('should create the user', async () => {
      await handler.execute(command);

      expect(userRepository.storedChanged()).toBeTruthy();
      expect(userRepository.stored()).toHaveLength(1);
      const user = userRepository.stored()[0];
      expect(user.toPrimitives()).toEqual({ ...data, interests: [] });
    });

    it('should publish the events', async () => {
      const event = UserSignedUpEventMother.createFromSignUpUserCommand(command);
      await handler.execute(command);

      expect(eventBus.domainEvents()).toHaveLength(1);
      expect(eventBus.domainEvents()[0]).toBeInstanceOf(UserSignedUpEvent);
      expect(eventBus.domainEvents()[0]).toEqual({
        ...event,
      });
    });
  });
});
