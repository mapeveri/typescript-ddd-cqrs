import faker from 'faker';
import UpdateWordCommand from '@src/languages/application/term/command/word/updateWordCommand';
import { WordTermPrimitives } from '@src/languages/domain/term/word/wordTerm';

interface UpdateWordCommandProps {
  id?: string;
  languageId?: string;
  countryId?: string;
  userId?: string;
  terms?: Array<WordTermPrimitives>;
}

export class UpdateWordCommandMother {
  static random(props?: UpdateWordCommandProps): UpdateWordCommand {
    const { id, userId, countryId, languageId, terms } = props ?? {};

    return new UpdateWordCommand(
      id ?? faker.datatype.uuid(),
      userId ?? faker.datatype.uuid(),
      languageId ?? faker.address.countryCode(),
      countryId ?? faker.datatype.uuid(),
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
