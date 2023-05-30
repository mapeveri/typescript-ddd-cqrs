import Term from '@src/languages/domain/term/term';
import { EXPRESSION } from '@src/languages/domain/term/term';
import faker from 'faker';

export class TermMother {
  static random(props?: Partial<Term>): Term {
    const { id, title, description, example, type, hashtags, likes, disLikes, favourites } = props ?? {};

    return {
      id: id ?? faker.datatype.uuid(),
      title: title ?? faker.random.word(),
      description: description ?? faker.random.word(),
      example: example ?? faker.random.word(),
      type: type ?? EXPRESSION,
      hashtags: hashtags,
      likes: likes,
      disLikes: disLikes,
      favourites: favourites,
    } as Term;
  }
}
