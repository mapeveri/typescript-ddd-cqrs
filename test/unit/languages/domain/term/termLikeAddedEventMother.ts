import { expect } from 'vitest';
import TermLikeAddedEvent from '@src/languages/domain/term/termLikeAddedEvent';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import { UserIdMother } from '@test/unit/account/domain/user/userIdMother';
import faker from 'faker';

type TermLikeAddedEventProps = {
  termId?: string;
  userId?: string;
  name?: string;
  photo?: string;
};

export class TermLikeAddedEventMother {
  static random(props: TermLikeAddedEventProps): TermLikeAddedEvent {
    const eventId = expect.any(String) as unknown as string;

    const { termId, userId, name, photo } = props;

    return new TermLikeAddedEvent(
      termId ?? TermIdMother.random().toString(),
      userId ?? UserIdMother.random().toString(),
      name ?? faker.name.findName(),
      photo ?? faker.image.imageUrl(),
      eventId,
    );
  }
}
