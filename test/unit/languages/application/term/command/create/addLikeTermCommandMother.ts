import faker from 'faker';
import AddLikeTermCommand from '@src/languages/application/term/command/create/addLikeTermCommand';
import { TermTypeEnum } from '@src/languages/domain/term/termType';

interface AddLikeTermCommandProps {
  termId?: string;
  type?: string;
  userId?: string;
}

export class AddLikeTermCommandMother {
  static random(props?: AddLikeTermCommandProps): AddLikeTermCommand {
    const { termId, type, userId } = props ?? {};

    return new AddLikeTermCommand(
      termId ?? faker.datatype.uuid(),
      type ?? TermTypeEnum.WORD,
      userId ?? faker.datatype.uuid(),
    );
  }
}
