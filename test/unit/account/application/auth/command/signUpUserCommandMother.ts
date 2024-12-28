import faker from 'faker';
import SignUpUserCommand from '@src/account/application/auth/command/signUpUserCommand';

interface SignupUserCommandProps {
  id?: string;
  name?: string;
  email?: string;
  token?: string;
  provider?: string;
  photo?: string;
}

export class SignUpUserCommandMother {
  static random(props?: SignupUserCommandProps): SignUpUserCommand {
    const { id, name, email, token, provider, photo } = props ?? {};

    return new SignUpUserCommand(
      id ?? faker.datatype.uuid(),
      name ?? faker.name.findName(),
      email ?? faker.internet.email(),
      token ?? faker.random.alphaNumeric(),
      provider ?? faker.random.word(),
      photo ?? faker.image.imageUrl(),
    );
  }
}
