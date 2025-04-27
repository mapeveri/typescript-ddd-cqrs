import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import TermRepository, { TERM_REPOSITORY } from '@src/language/domain/term/termRepository';
import TermId from '@src/language/domain/term/termId';
import Term from '@src/language/domain/term/term';
import TermDoesNotExistsException from '@src/language/domain/term/termDoesNotExistsException';
import { ASYNC_EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import DeleteTermCommand from './deleteTermCommand';

@CommandHandler(DeleteTermCommand)
export default class DeleteTermCommandHandler implements ICommandHandler<DeleteTermCommand> {
  constructor(
    @Inject(TERM_REPOSITORY) private readonly termRepository: TermRepository,
    @Inject(ASYNC_EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteTermCommand): Promise<void> {
    const term = await this.getTerm(command.id);

    term.delete();

    await this.termRepository.remove(term);

    void this.eventBus.publish(term.pullDomainEvents());
  }

  private async getTerm(termId: string): Promise<Term> {
    const term = await this.termRepository.findById(TermId.of(termId));
    if (!term) {
      throw new TermDoesNotExistsException(termId.toString());
    }

    return term;
  }
}
