import faker from 'faker';
import { UserIdMother } from '@test/unit/languages/domain/user/userIdMother';
import TermLike from '@src/languages/domain/term/termLike';
import UserId from '@src/languages/domain/user/userId';
import TermId from '@src/languages/domain/term/termId';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';

interface TermLikeMotherProps {
  userId?: UserId;
  termId?: TermId;
  name?: string;
  photo?: string;
}

export default class TermLikeMother {
  static random(props?: TermLikeMotherProps): TermLike {
    const { termId, userId, name, photo } = props ?? {};

    return new TermLike(
      userId ?? UserIdMother.random(),
      termId ?? TermIdMother.random(),
      name ?? faker.name.findName(),
      photo ?? faker.image.imageUrl(),
    );
  }
}
