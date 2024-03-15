import { TermView } from '@src/languages/application/term/viewModel/termView';
import faker from 'faker';
import TermTypeMother from '@test/unit/languages/domain/term/termTypeMother';

export class TermViewMother {
  static random(props?: Partial<TermView>): TermView {
    const { id, title, description, example, type, hashtags, totalLikes, createdAt } = props ?? {};

    return {
      id: id ?? faker.datatype.uuid(),
      title: title ?? faker.random.word(),
      description: description ?? faker.random.word(),
      example: example ?? faker.random.word(),
      type: type ?? TermTypeMother.random().value,
      hashtags: hashtags ?? [],
      totalLikes: totalLikes ?? 0,
      createdAt: createdAt ?? faker.date.past().toString(),
    };
  }
}
