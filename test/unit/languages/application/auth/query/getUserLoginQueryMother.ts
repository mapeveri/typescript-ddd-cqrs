import GetUserLoginQuery from '@src/languages/application/auth/query/getUserLoginQuery';
import faker from 'faker';

interface GetUserLoginQueryProps {
  id?: string;
  name?: string;
  email?: string;
  token?: string;
  provider?: string;
  photo?: string;
}

export class GetUserLoginQueryMother {
  static random(props?: GetUserLoginQueryProps): GetUserLoginQuery {
    const { id, name, email, token, provider, photo } = props ?? {};

    return new GetUserLoginQuery(
      id ?? faker.datatype.uuid(),
      name ?? faker.name.findName(),
      email ?? faker.internet.email(),
      token ?? faker.random.alphaNumeric(),
      provider ?? faker.random.word(),
      photo ?? faker.image.imageUrl(),
    );
  }
}
