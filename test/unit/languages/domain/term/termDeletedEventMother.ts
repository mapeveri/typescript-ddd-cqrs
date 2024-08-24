import { expect } from '@jest/globals';

import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import TermDeletedEvent from '@src/languages/domain/term/termDeletedEvent';

type TermDeletedEventProps = {
  termId?: string;
};

export class TermDeletedEventMother {
  static random(props: TermDeletedEventProps): TermDeletedEvent {
    const eventId = expect.any(String) as unknown as string;

    const { termId } = props;

    return new TermDeletedEvent(
      termId ?? TermIdMother.random().toString(),
      eventId,
    );
  }
}
