import faker from 'faker';
import WordTerm from '@src/language/domain/term/word/wordTerm';

export interface WordTermMotherProps {
  title?: string;
  description?: string;
  example?: string;
  taggedWords?: Array<string>;
}

export default class WordTermMother {
  static random(props?: WordTermMotherProps): WordTerm {
    const { title, description, example, taggedWords } = props ?? {};

    return WordTerm.of({
      word: title ?? faker.random.word(),
      description: description ?? faker.random.word(),
      example: example ?? faker.random.word(),
      hashtags: taggedWords ?? ['test'],
    });
  }
}
