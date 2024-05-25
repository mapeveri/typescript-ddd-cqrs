import AddLikeTermCommand from '@src/languages/application/term/command/addLikeTermCommand';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import { UserIdMother } from '@test/unit/languages/domain/user/userIdMother';

interface AddLikeTermCommandProps {
  termId?: string;
  userId?: string;
}

export class AddLikeTermCommandMother {
  static random(props?: AddLikeTermCommandProps): AddLikeTermCommand {
    const { termId, userId } = props ?? {};

    return new AddLikeTermCommand(
      termId ?? TermIdMother.random().toString(),
      userId ?? UserIdMother.random().toString(),
    );
  }
}
