import DislikeTermCommand from '@src/languages/application/term/command/dislikeTermCommand';
import { TermLikeIdMother } from '@test/unit/languages/domain/term/termLikeIdMother';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import { UserIdMother } from '@test/unit/languages/domain/user/userIdMother';

interface DislikeTermCommandProps {
  id?: string;
  termId?: string;
  userId?: string;
}

export class DislikeTermCommandMother {
  static random(props?: DislikeTermCommandProps): DislikeTermCommand {
    const { id, termId, userId } = props ?? {};

    return new DislikeTermCommand(
      id ?? TermLikeIdMother.random().toString(),
      termId ?? TermIdMother.random().toString(),
      userId ?? UserIdMother.random().toString(),
    );
  }
}
