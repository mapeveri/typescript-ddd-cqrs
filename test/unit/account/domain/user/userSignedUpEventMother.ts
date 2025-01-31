import { expect } from 'vitest';
import SignUpUserCommand from '@src/account/application/auth/command/signUpUserCommand';
import UserSignedUpEvent from '@src/account/domain/user/userSignedUpEvent';

export class UserSignedUpEventMother {
  static createFromSignUpUserCommand(command: SignUpUserCommand): UserSignedUpEvent {
    const eventId = expect.any(String) as unknown as string;
    return new UserSignedUpEvent(command.id, command.name, command.provider, command.email, command.photo, eventId);
  }
}
