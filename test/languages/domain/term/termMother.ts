import Term from '@src/languages/domain/term/term';
import faker from 'faker';
import TermTypeMother from './valueObjects/termTypeMother';

export class TermMother {
  static random(props?: Partial<Term>): Term {
    const { id, title, description, example, type, hashtags, likes, disLikes, favourites } = props ?? {};

    return new Term(
      id ?? faker.datatype.uuid(),
      title ?? faker.random.word(),
      description ?? faker.random.word(),
      example ?? faker.random.word(),
      type ?? TermTypeMother.random(),
      hashtags ?? [],
      likes ?? [],
      disLikes ?? [],
      favourites ?? []
    );
  }
}
