import DeleteExpressionCommand from '@src/languages/application/expression/command/delete/deleteExpressionCommand';
import faker from 'faker';

export class DeleteExpressionCommandMother {
  static random(id?: string): DeleteExpressionCommand {
    return new DeleteExpressionCommand(id ?? faker.datatype.uuid());
  }
}
