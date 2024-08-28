import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import TermId from '@src/languages/domain/term/termId';
import UserId from '@src/languages/domain/user/userId';
import DislikeTermCommand from '@src/languages/application/term/command/dislikeTermCommand';
import Term from '@src/languages/domain/term/term';
import TermDoesNotExistsException from '@src/languages/domain/term/termDoesNotExistsException';
import User from '@src/languages/domain/user/user';
import UserDoesNotExistsException from '@src/languages/domain/user/userDoesNotExistsException';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import TermRepository, { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import { ASYNC_EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';

@CommandHandler(DislikeTermCommand)
export default class DislikeTermCommandHandler implements ICommandHandler<DislikeTermCommand> {
  constructor(
    @Inject(TERM_REPOSITORY) private readonly termRepository: TermRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(ASYNC_EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(command: DislikeTermCommand): Promise<void> {
    const termId = TermId.of(command.termId);
    const userId = UserId.of(command.userId);

    const term = await this.getTerm(termId);
    const user = await this.getUser(userId);

    term.dislike(userId, user.getName(), user.getPhoto());

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
