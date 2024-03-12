import { expect } from '@jest/globals';
import LoginUserCommand from '@src/languages/application/auth/command/loginUser/loginUserCommand';
import AuthSessionCreatedEvent from '@src/languages/domain/auth/authSessionCreatedEvent';

import faker from 'faker';

interface AuthSessionCreatedEventProps {
  id?: string;
  name?: string;
  email?: string;
  token?: string;
  provider?: string;
  photo?: string;
}

export class AuthSessionCreatedEventMother {
  static random(props?: AuthSessionCreatedEventProps): AuthSessionCreatedEvent {
    const {
      id = faker.datatype.uuid(),
      name = faker.name.findName(),
      email = faker.internet.email(),
      token = faker.random.alphaNumeric(),
      provider = faker.random.word(),
      photo = faker.image.imageUrl(),
    } = props ?? {};

    const eventId = expect.any(String) as unknown as string;
    return new AuthSessionCreatedEvent(id, name, email, token, provider, photo, eventId);
  }

  static createFromLoginUserCommand(command: LoginUserCommand): AuthSessionCreatedEvent {
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
