import { expect } from 'vitest';

import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import { UserIdMother } from '@test/unit/account/domain/user/userIdMother';
import TermDislikedEvent from '@src/languages/domain/term/termDislikedEvent';

type TermLikeAddedEventProps = {
  termId?: string;
  userId?: string;
};

export class TermDislikedEventMother {
  static random(props: TermLikeAddedEventProps): TermDislikedEvent {
    const eventId = expect.any(String) as unknown as string;

    const { termId, userId } = props;

    return new TermDislikedEvent(
      termId ?? TermIdMother.random().toString(),
      userId ?? UserIdMother.random().toString(),
      eventId,
    );
  }
}
