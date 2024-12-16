import { expect } from '@jest/globals';
import SignupUserCommand from '@src/account/application/auth/command/signupUserCommand';
import UserCreatedEvent from '@src/account/domain/user/userCreatedEvent';

export class UserCreatedEventMother {
  static createFromSignupUserCommand(command: SignupUserCommand): UserCreatedEvent {
    const eventId = expect.any(String) as unknown as string;
    return new UserCreatedEvent(command.id, command.name, command.provider, command.email, command.photo, eventId);
  }
}
