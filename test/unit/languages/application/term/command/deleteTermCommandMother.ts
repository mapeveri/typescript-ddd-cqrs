import DeleteTermCommand from '@src/language/application/term/command/deleteTermCommand';
import faker from 'faker';

export class DeleteTermCommandMother {
  static random(id?: string): DeleteTermCommand {
    return new DeleteTermCommand(id ?? faker.datatype.uuid());
  }
}
