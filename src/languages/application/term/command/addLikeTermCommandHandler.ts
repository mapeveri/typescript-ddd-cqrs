import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import AddLikeTermCommand from '@src/languages/application/term/command/addLikeTermCommand';
import TermId from '@src/languages/domain/term/termId';
import UserId from '@src/languages/domain/user/userId';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import TermRepository, { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import Term from '@src/languages/domain/term/term';
import TermDoesNotExistsException from '@src/languages/domain/term/termDoesNotExistsException';
import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import UserDoesNotExistsException from '@src/languages/domain/user/userDoesNotExistsException';
import User from '@src/languages/domain/user/user';
import TermLike from '@src/languages/domain/term/termLike';
import { ASYNC_EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';

@CommandHandler(AddLikeTermCommand)
export default class AddLikeTermCommandHandler implements ICommandHandler<AddLikeTermCommand> {
  constructor(
    @Inject(TERM_REPOSITORY) private readonly termRepository: TermRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(ASYNC_EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(command: AddLikeTermCommand): Promise<void> {
    const termId = TermId.of(command.termId);
    const userId = UserId.of(command.userId);

    const term = await this.getTerm(termId);
    const user = await this.getUser(userId);
    const termLike = TermLike.of({ userId: userId.toString(), name: user.name, photo: user.photo });

    term.addLike(termLike);

    await this.termRepository.save(term);

    void this.eventBus.publish(term.pullDomainEvents());
  }

  private async getTerm(termId: TermId): Promise<Term> {
    const term = await this.termRepository.findById(termId);
    if (!term) {
      throw new TermDoesNotExistsException(termId.toString());
    }

    return term;
  }

  private async getUser(userId: UserId): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserDoesNotExistsException(userId.toString());
    }

    return user;
  }
}
