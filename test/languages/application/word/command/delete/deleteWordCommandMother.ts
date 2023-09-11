import DeleteWordCommand from '@src/languages/application/word/command/delete/deleteWordCommand';
import faker from 'faker';

export class DeleteWordCommandMother {
  static random(id?: string): DeleteWordCommand {
    return new DeleteWordCommand(id ?? faker.datatype.uuid());
  }
}
