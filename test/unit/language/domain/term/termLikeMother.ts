import faker from 'faker';
import { UserIdMother } from '@test/unit/account/domain/user/userIdMother';
import TermLike from '@src/language/domain/term/termLike';
import UserId from '@src/account/domain/user/userId';
import TermId from '@src/language/domain/term/termId';
import { TermIdMother } from '@test/unit/language/domain/term/termIdMother';
import TermLikeId from '@src/language/domain/term/termLikeId';
import { TermLikeIdMother } from '@test/unit/language/domain/term/termLikeIdMother';

interface TermLikeMotherProps {
  id?: TermLikeId;
  userId?: UserId;
  termId?: TermId;
  name?: string;
  photo?: string;
}

export default class TermLikeMother {
  static random(props?: TermLikeMotherProps): TermLike {
    const { id, termId, userId, name, photo } = props ?? {};

    return new TermLike(
      id ?? TermLikeIdMother.random(),
      userId ?? UserIdMother.random(),
      termId ?? TermIdMother.random(),
      name ?? faker.name.findName(),
      photo ?? faker.image.imageUrl(),
    );
  }
}
