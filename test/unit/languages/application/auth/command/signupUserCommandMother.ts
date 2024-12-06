import faker from 'faker';
import SignupUserCommand from '@src/languages/application/auth/command/signupUserCommand';

interface SignupUserCommandProps {
  id?: string;
  name?: string;
  email?: string;
  token?: string;
  provider?: string;
  photo?: string;
}

export class SignupUserCommandMother {
  static random(props?: SignupUserCommandProps): SignupUserCommand {
    const { id, name, email, token, provider, photo } = props ?? {};

    return new SignupUserCommand(
      id ?? faker.datatype.uuid(),
      name ?? faker.name.findName(),
      email ?? faker.internet.email(),
      token ?? faker.random.alphaNumeric(),
      provider ?? faker.random.word(),
      photo ?? faker.image.imageUrl(),
    );
  }
}
