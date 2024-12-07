import GetUserSocialLoginQuery from '@src/languages/application/auth/query/getUserSocialLoginQuery';
import faker from 'faker';

interface GetUserSocialLoginQueryProps {
  id?: string;
  name?: string;
  email?: string;
  token?: string;
  provider?: string;
  photo?: string;
}

export class GetUserSocialLoginQueryMother {
  static random(props?: GetUserSocialLoginQueryProps): GetUserSocialLoginQuery {
    const { id, name, email, token, provider, photo } = props ?? {};

    return new GetUserSocialLoginQuery(
      id ?? faker.datatype.uuid(),
      name ?? faker.name.findName(),
      email ?? faker.internet.email(),
      token ?? faker.random.alphaNumeric(),
      provider ?? faker.random.word(),
      photo ?? faker.image.imageUrl(),
    );
  }
}
