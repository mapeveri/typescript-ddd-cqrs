import TermView from '@src/languages/application/term/projection/termView';
import faker from 'faker';
import TermTypeMother from './valueObjects/termTypeMother';

export class TermMother {
  static random(props?: Partial<TermView>): TermView {
    const { id, title, description, example, type, hashtags, totalLikes, createdAt } = props ?? {};

    return new TermView(
      id ?? faker.datatype.uuid(),
      title ?? faker.random.word(),
      description ?? faker.random.word(),
      example ?? faker.random.word(),
      type ?? TermTypeMother.random(),
      hashtags ?? [],
      totalLikes ?? 0,
      createdAt ?? faker.date.past(),
    );
  }
}
