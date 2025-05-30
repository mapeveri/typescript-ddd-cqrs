import faker from 'faker';
import TermId from '@src/language/domain/term/termId';

export class TermIdMother {
  static random(id?: string): TermId {
    return TermId.of(id ?? faker.datatype.uuid());
  }
}
