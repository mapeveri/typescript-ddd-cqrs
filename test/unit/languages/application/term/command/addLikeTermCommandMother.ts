import AddLikeTermCommand from '@src/languages/application/term/command/addLikeTermCommand';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import { UserIdMother } from '@test/unit/languages/domain/user/userIdMother';
import { TermLikeIdMother } from '@test/unit/languages/domain/term/termLikeIdMother';

interface AddLikeTermCommandProps {
  id?: string;
  termId?: string;
  userId?: string;
}

export class AddLikeTermCommandMother {
  static random(props?: AddLikeTermCommandProps): AddLikeTermCommand {
    const { id, termId, userId } = props ?? {};

    return new AddLikeTermCommand(
      id ?? TermLikeIdMother.random().toString(),
      termId ?? TermIdMother.random().toString(),
      userId ?? UserIdMother.random().toString(),
    );
  }
}
