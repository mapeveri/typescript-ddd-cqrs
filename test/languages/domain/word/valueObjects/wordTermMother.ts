import faker from 'faker';
import WordTerm from '@src/languages/domain/word/valueObjects/wordTerm';

export interface WordTermMotherProps {
  title?: string;
  description?: string;
  example?: string;
  taggedWords?: Array<string>;
}

export default class WordTermMother {
  static random(props?: WordTermMotherProps): WordTerm {
    const { title, description, example, taggedWords } = props ?? {};

    return new WordTerm(
      title ?? faker.random.word(),
      description ?? faker.random.word(),
      example ?? faker.random.word(),
      taggedWords ?? ['test']
    );
  }
}
