import faker from 'faker';
import DislikeTermCommand from '@src/languages/application/term/command/dislikeTermCommand';

interface DislikeTermCommandProps {
  termId?: string;
  userId?: string;
}

export class DislikeTermCommandMother {
  static random(props?: DislikeTermCommandProps): DislikeTermCommand {
    const { termId, userId } = props ?? {};

    return new DislikeTermCommand(termId ?? faker.datatype.uuid(), userId ?? faker.datatype.uuid());
  }
}
