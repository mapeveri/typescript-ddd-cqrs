import CreateExpressionCommand from '@src/languages/application/expression/command/create/createExpressionCommand';
import faker from 'faker';

interface CreateExpressionCommandProps {
  id?: string;
  languageId?: string;
  countryId?: string;
  userId?: string;
  terms?: Array<{ [key: string]: any }>;
}

export class CreateExpressionCommandMother {
  static random(props?: CreateExpressionCommandProps): CreateExpressionCommand {
    const { id, languageId, countryId, userId, terms } = props ?? {};

    return new CreateExpressionCommand(
      id ?? faker.datatype.uuid(),
      languageId ?? faker.datatype.uuid(),
      countryId ?? faker.datatype.uuid(),
      userId ?? faker.datatype.uuid(),
      terms ?? [{ key: faker.random.word() }]
    );
  }
}
