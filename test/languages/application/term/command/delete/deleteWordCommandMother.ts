import DeleteWordCommand from '@src/languages/application/term/command/delete/deleteWordCommand';
import faker from 'faker';

export class DeleteWordCommandMother {
  static random(id?: string): DeleteWordCommand {
    return new DeleteWordCommand(id ?? faker.datatype.uuid());
  }
}
