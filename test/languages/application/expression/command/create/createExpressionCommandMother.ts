import CreateExpressionCommand from '@src/languages/application/expression/command/create/createExpressionCommand';
import { ExpressionTermDTO } from '@src/languages/domain/expression/valueObjects/expressionTerm';
import faker from 'faker';

interface CreateExpressionCommandProps {
  id?: string;
  languageId?: string;
  countryId?: string;
  userId?: string;
  terms?: Array<ExpressionTermDTO>;
}

export class CreateExpressionCommandMother {
  static random(props?: CreateExpressionCommandProps): CreateExpressionCommand {
    const { id, languageId, countryId, userId, terms } = props ?? {};

    return new CreateExpressionCommand(
      id ?? faker.datatype.uuid(),
      languageId ?? faker.datatype.uuid(),
      countryId ?? faker.datatype.uuid(),
      userId ?? faker.datatype.uuid(),
      terms ?? [
        {
          expression: faker.random.word(),
          example: faker.random.word(),
          description: faker.random.word(),
          hashtags: ['test'],
        },
      ]
    );
  }
}
