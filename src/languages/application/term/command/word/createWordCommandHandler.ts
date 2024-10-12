import { ASYNC_EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import CreateWordCommand from './createWordCommand';
import Word from '@src/languages/domain/term/word/word';
import CountryId from '@src/languages/domain/country/countryId';
import UserId from '@src/languages/domain/user/userId';
import WordTermCollection from '@src/languages/domain/term/word/wordTermCollection';
import WordAlreadyExistsException from '@src/languages/domain/term/word/wordAlreadyExistsException';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import TermRepository, { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import TermId from '@src/languages/domain/term/termId';

@CommandHandler(CreateWordCommand)
export default class CreateWordCommandHandler implements ICommandHandler<CreateWordCommand> {
  constructor(
    @Inject(TERM_REPOSITORY) private readonly termRepository: TermRepository,
    @Inject(ASYNC_EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateWordCommand): Promise<void> {
    const id = TermId.of(command.id);
    await this.guardWordDoesNotExists(id);

    const word = Word.create(
      id,
      command.languageId,
      CountryId.of(command.countryId),
      WordTermCollection.of(command.terms),
      UserId.of(command.userId),
    );

    this.termRepository.save(word);

    void this.eventBus.publish(word.pullDomainEvents());
  }

  private async guardWordDoesNotExists(id: TermId): Promise<void> {
    const word = await this.termRepository.findById(id);
    if (word) {
      throw new WordAlreadyExistsException(id.toString());
    }
  }
}
