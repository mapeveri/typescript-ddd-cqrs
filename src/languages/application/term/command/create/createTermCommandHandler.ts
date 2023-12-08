import TermRepository, { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import CreateTermCommand from './createTermCommand';
import Term from '@src/languages/domain/term/term';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import TermType from '@src/languages/domain/term/valueObjects/termType';
import { EVENT_BUS, EventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import TermCreatedFailedEvent from '@src/languages/domain/term/domainEvents/TermCreatedFailedEvent';

@CommandHandler(CreateTermCommand)
export default class CreateTermCommandHandler implements ICommandHandler<CreateTermCommand> {
  constructor(
    @Inject(TERM_REPOSITORY) private readonly termRepository: TermRepository,
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateTermCommand): Promise<void> {
    const term = this.getTerm(command);
    try {
      await this.termRepository.save(term);
    } catch (e) {
      void this.eventBus.publish([new TermCreatedFailedEvent(term.id, term.type.value)]);
      throw e;
    }
  }

  private getTerm(command: CreateTermCommand): Term {
    return Term.create(
      command.id,
      command.title,
      command.description,
      command.example,
      TermType.of(command.type),
      command.hashtags,
      0,
    );
  }
}
