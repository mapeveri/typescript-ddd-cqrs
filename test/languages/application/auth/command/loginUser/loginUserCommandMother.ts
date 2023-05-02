import LoginUserCommand from '@src/languages/application/auth/command/loginUser/loginUserCommand';
import faker from 'faker';

interface LoginUserCommandProps {
  id?: string;
  name?: string;
  email?: string;
  token?: string;
  provider?: string;
  photo?: string;
}

export class LoginUserCommandMother {
  static random(props?: LoginUserCommandProps): LoginUserCommand {
    const { id, name, email, token, provider, photo } = props ?? {};

    return new LoginUserCommand(
      id ?? faker.datatype.uuid(),
      name ?? faker.name.findName(),
      email ?? faker.internet.email(),
      token ?? faker.random.alphaNumeric(),
      provider ?? faker.random.word(),
      photo ?? faker.image.imageUrl()
    );
  }
}
