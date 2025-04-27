import faker from 'faker';
import TermLikeId from '@src/language/domain/term/termLikeId';

export class TermLikeIdMother {
  static random(id?: string): TermLikeId {
    return TermLikeId.of(id ?? faker.datatype.uuid());
  }
}
