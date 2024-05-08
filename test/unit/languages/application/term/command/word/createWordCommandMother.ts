import CreateWordCommand from '@src/languages/application/term/command/word/createWordCommand';
import { WordTermPrimitives } from '@src/languages/domain/term/word/wordTerm';
import faker from 'faker';

interface CreateWordCommandProps {
  id?: string;
  languageId?: string;
  countryId?: string;
  userId?: string;
  terms?: Array<WordTermPrimitives>;
}

export class CreateWordCommandMother {
  static random(props?: CreateWordCommandProps): CreateWordCommand {
    const { id, languageId, countryId, userId, terms } = props ?? {};

    return new CreateWordCommand(
      id ?? faker.datatype.uuid(),
      languageId ?? faker.datatype.uuid(),
      countryId ?? faker.datatype.uuid(),
      userId ?? faker.datatype.uuid(),
      terms ?? [
        {
          word: faker.random.word(),
          example: faker.random.word(),
          description: faker.random.word(),
          hashtags: ['test'],
        },
      ],
    );
  }
}
