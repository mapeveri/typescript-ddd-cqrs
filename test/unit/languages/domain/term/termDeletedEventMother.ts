import { expect } from '@jest/globals';

import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import TermDeletedEvent from '@src/languages/domain/term/termDeletedEvent';
import TermTypeMother from './termTypeMother';

type TermDeletedEventProps = {
  termId?: string;
  termType?: string;
};

export class TermDeletedEventMother {
  static random(props: TermDeletedEventProps): TermDeletedEvent {
    const eventId = expect.any(String) as unknown as string;

    const { termId, termType } = props;

    return new TermDeletedEvent(
      termId ?? TermIdMother.random().toString(),
      termType ?? TermTypeMother.random().toString(),
      eventId,
    );
  }
}