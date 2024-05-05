import faker from 'faker';
import { UserIdMother } from '@test/unit/languages/domain/user/userIdMother';
import TermLike from '@src/languages/domain/term/termLike';
import UserId from '@src/languages/domain/user/userId';

interface TermLikeMotherProps {
  userId?: UserId;
  name?: string;
  photo?: string;
}

export default class TermLikeMother {
  static random(props?: TermLikeMotherProps): TermLike {
    const { userId, name, photo } = props ?? {};

    return TermLike.of({
      userId: userId ?? UserIdMother.random(),
      name: name ?? faker.name.findName(),
      photo: photo ?? faker.image.imageUrl(),
    });
  }
}
