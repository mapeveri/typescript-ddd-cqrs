import faker from 'faker';
import AddLikeTermCommand from '@src/languages/application/term/command/addLikeTermCommand';

interface AddLikeTermCommandProps {
  termId?: string;
  userId?: string;
}

export class AddLikeTermCommandMother {
  static random(props?: AddLikeTermCommandProps): AddLikeTermCommand {
    const { termId, userId } = props ?? {};

    return new AddLikeTermCommand(termId ?? faker.datatype.uuid(), userId ?? faker.datatype.uuid());
  }
}
