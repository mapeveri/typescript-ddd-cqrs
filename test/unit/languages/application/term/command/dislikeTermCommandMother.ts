import DislikeTermCommand from '@src/languages/application/term/command/dislikeTermCommand';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import { UserIdMother } from '@test/unit/account/domain/user/userIdMother';

interface DislikeTermCommandProps {
  termId?: string;
  userId?: string;
}

export class DislikeTermCommandMother {
  static random(props?: DislikeTermCommandProps): DislikeTermCommand {
    const { termId, userId } = props ?? {};

    return new DislikeTermCommand(
      termId ?? TermIdMother.random().toString(),
      userId ?? UserIdMother.random().toString(),
    );
  }
}
