import { expect } from 'vitest';

import { TermIdMother } from '@test/unit/language/domain/term/termIdMother';
import TermDeletedEvent from '@src/language/domain/term/termDeletedEvent';
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
