import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import UpdateWordCommand from '@src/languages/application/term/command/word/updateWordCommand';
import TermId from '@src/languages/domain/term/termId';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import TermRepository, { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import TermDoesNotExistsException from '@src/languages/domain/term/termDoesNotExistsException';
import Word from '@src/languages/domain/term/word/word';
import { ASYNC_EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';

@CommandHandler(UpdateWordCommand)
export default class UpdateWordCommandHandler implements ICommandHandler<UpdateWordCommand> {
  constructor(
    @Inject(TERM_REPOSITORY) private readonly termRepository: TermRepository,
    @Inject(ASYNC_EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateWordCommand): Promise<void> {
    const word = await this.getTerm(command.id);
    word.update(command.userId, command.languageId, command.countryId, command.terms);

    this.termRepository.save(word);

    void this.eventBus.publish(word.pullDomainEvents());
  }

  private async getTerm(id: string): Promise<Word> {
    const term = (await this.termRepository.findById(TermId.of(id))) as Word | undefined;
    if (!term) {
      throw new TermDoesNotExistsException(id);
    }

    return term;
  }
}
