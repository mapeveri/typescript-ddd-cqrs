import { beforeEach, beforeAll, describe, expect, it, jest } from '@jest/globals';
import { EventBusMock } from '@test/unit/shared/domain/buses/eventBus/eventBusMock';
import SignupUserCommandHandler from '@src/languages/application/auth/command/signupUserCommandHandler';
import { SignupUserCommandMother } from '@test/unit/languages/application/auth/command/signupUserCommandMother';
import SignupUserCommand from '@src/languages/application/auth/command/signupUserCommand';
import { UserRepositoryMock } from '@test/unit/languages/domain/user/userRepositoryMock';
import { UserMother } from '@test/unit/languages/domain/user/userMother';
import UserAlreadyExistsException from '@src/languages/domain/user/userAlreadyExistsException';
import { UserIdMother } from '@test/unit/languages/domain/user/userIdMother';
import UserCreatedEvent from '@src/languages/domain/user/userCreatedEvent';
import { UserCreatedEventMother } from '@test/unit/languages/domain/user/userCreatedEventMother';

describe('Given a SignupUserCommandHandler to handle', () => {
  let userRepository: UserRepositoryMock;
  let eventBus: EventBusMock;
  let handler: SignupUserCommandHandler;

  const prepareDependencies = () => {
    userRepository = new UserRepositoryMock();
    eventBus = new EventBusMock();
  };

  const initHandler = () => {
    handler = new SignupUserCommandHandler(userRepository, eventBus);

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
    let command: SignupUserCommand;

    function startScenario() {
      command = SignupUserCommandMother.random();
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
    let command: SignupUserCommand;

    function startScenario() {
      data = {
        id: '4a4df157-8ab8-50af-bb39-88e8ce29eb16',
        email: 'test@test.com',
        provider: 'google',
        photo: '',
        name: 'test',
      };
      command = SignupUserCommandMother.random(data);
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
      const event = UserCreatedEventMother.createFromSignupUserCommand(command);
      await handler.execute(command);

      expect(eventBus.domainEvents()).toHaveLength(1);
      expect(eventBus.domainEvents()[0]).toBeInstanceOf(UserCreatedEvent);
      expect(eventBus.domainEvents()[0]).toEqual({
        ...event,
      });
    });
  });
});
