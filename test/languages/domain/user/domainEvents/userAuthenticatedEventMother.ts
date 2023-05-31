import { expect } from '@jest/globals';
import LoginUserCommand from '@src/languages/application/auth/command/loginUser/loginUserCommand';
import UserAuthenticatedEvent from '@src/languages/domain/user/domainEvents/userAuthenticatedEvent';
import faker from 'faker';

interface UserAuthenticatedEventProps {
  id?: string;
  name?: string;
  email?: string;
  token?: string;
  provider?: string;
  photo?: string;
}

export class UserAuthenticatedEventMother {
  static random(props?: UserAuthenticatedEventProps): UserAuthenticatedEvent {
    const {
      id = faker.datatype.uuid(),
      name = faker.name.findName(),
      email = faker.internet.email(),
      token = faker.random.alphaNumeric(),
      provider = faker.random.word(),
      photo = faker.image.imageUrl(),
    } = props ?? {};

    const eventId = expect.any(String) as unknown as string;
    return new UserAuthenticatedEvent(id, name, email, token, provider, photo, eventId);
  }

  static createFromLoginUserCommand(command: LoginUserCommand): UserAuthenticatedEvent {
    return this.random({
      id: command.id,
      name: command.name,
      email: command.email,
      token: command.token,
      provider: command.provider,
      photo: command.photo,
    });
  }
}
