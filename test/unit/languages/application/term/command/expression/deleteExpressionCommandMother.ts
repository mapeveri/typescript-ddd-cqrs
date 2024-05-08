import DeleteExpressionCommand from '@src/languages/application/term/command/expression/deleteExpressionCommand';
import faker from 'faker';

export class DeleteExpressionCommandMother {
  static random(id?: string): DeleteExpressionCommand {
    return new DeleteExpressionCommand(id ?? faker.datatype.uuid());
  }
}
