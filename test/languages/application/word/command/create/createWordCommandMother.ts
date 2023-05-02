import CreateWordCommand from '@src/languages/application/word/command/create/createWordCommand';
import faker from 'faker';

interface CreateWordCommandProps {
  id?: string;
  languageId?: string;
  countryId?: string;
  userId?: string;
  terms?: Array<{ [key: string]: string }>;
}

export class CreateWordCommandMother {
  static random(props?: CreateWordCommandProps): CreateWordCommand {
    const { id, languageId, countryId, userId, terms } = props ?? {};

    return new CreateWordCommand(
      id ?? faker.datatype.uuid(),
      languageId ?? faker.datatype.uuid(),
      countryId ?? faker.datatype.uuid(),
      userId ?? faker.datatype.uuid(),
      terms ?? [{ key: faker.random.word() }]
    );
  }
}
