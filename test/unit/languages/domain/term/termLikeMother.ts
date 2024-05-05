import faker from 'faker';
import { UserIdMother } from '@test/unit/languages/domain/user/userIdMother';
import TermLike from '@src/languages/domain/term/termLike';

interface TermLikeMotherProps {
  userId?: string;
  name?: string;
  photo?: string;
}

export default class TermLikeMother {
  static random(props?: TermLikeMotherProps): TermLike {
    const { userId, name, photo } = props ?? {};

    return TermLike.of({
      userId: userId ?? UserIdMother.random().toString(),
      name: name ?? faker.name.findName(),
      photo: photo ?? faker.image.imageUrl(),
    });
  }
}
