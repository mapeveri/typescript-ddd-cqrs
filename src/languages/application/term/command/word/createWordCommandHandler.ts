import { ASYNC_EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import CreateWordCommand from './createWordCommand';
import Word from '@src/languages/domain/term/word/word';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import TermRepository, { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import TermId from '@src/languages/domain/term/termId';
import TermAlreadyExistsException from '@src/languages/domain/term/termAlreadyExistsException';

@CommandHandler(CreateWordCommand)
export default class CreateWordCommandHandler implements ICommandHandler<CreateWordCommand> {
  constructor(
    @Inject(TERM_REPOSITORY) private readonly termRepository: TermRepository,
    @Inject(ASYNC_EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateWordCommand): Promise<void> {
    await this.guardWordDoesNotExists(command.id);

    const word = Word.create(command.id, command.languageId, command.countryId, command.terms, command.userId);

    this.termRepository.save(word);

    void this.eventBus.publish(word.pullDomainEvents());
  }

  private async guardWordDoesNotExists(id: string): Promise<void> {
    const word = await this.termRepository.findById(TermId.of(id));
    if (word) {
      throw new TermAlreadyExistsException(id.toString());
    }
  }
}
