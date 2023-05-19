import faker from 'faker';
import Term from '@src/languages/domain/word/valueObjects/term';

export interface TermMotherProps {
  title?: string;
  description?: string;
  example?: string;
  taggedWords?: Array<string>;
}

export default class TermMother {
  static random(props?: TermMotherProps): Term {
    const { title, description, example, taggedWords } = props ?? {};

    return new Term(
      title ?? faker.random.word(),
      description ?? faker.random.word(),
      example ?? faker.random.word(),
      taggedWords ?? ['test']
    );
  }
}
