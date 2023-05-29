import CreateWordCommand from '@src/languages/application/word/command/create/createWordCommand';
import { WordTermDTO } from '@src/languages/domain/word/valueObjects/wordTerm';
import faker from 'faker';

interface CreateWordCommandProps {
  id?: string;
  languageId?: string;
  countryId?: string;
  userId?: string;
  terms?: Array<WordTermDTO>;
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
      ]
    );
  }
}
