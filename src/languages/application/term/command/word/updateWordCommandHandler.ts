import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import UpdateWordCommand from '@src/languages/application/term/command/word/updateWordCommand';
import TermId from '@src/languages/domain/term/termId';
import UserId from '@src/languages/domain/user/userId';
import CountryId from '@src/languages/domain/country/countryId';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import TermRepository, { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import TermDoesNotExistsException from '@src/languages/domain/term/termDoesNotExistsException';
import Word from '@src/languages/domain/term/word/word';
import WordTermCollection from '@src/languages/domain/term/word/wordTermCollection';
import { ASYNC_EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';

@CommandHandler(UpdateWordCommand)
export default class UpdateWordCommandHandler implements ICommandHandler<UpdateWordCommand> {
  constructor(
    @Inject(TERM_REPOSITORY) private readonly termRepository: TermRepository,
    @Inject(ASYNC_EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateWordCommand): Promise<void> {
    const termId = TermId.of(command.id);
    const userId = UserId.of(command.userId);
    const languageId = command.languageId;
    const countryId = CountryId.of(command.countryId);
    const terms = WordTermCollection.of(command.terms);

    const word = await this.getTerm(termId);
    word.update(userId, languageId, countryId, terms);

    this.termRepository.save(word);

    void this.eventBus.publish(word.pullDomainEvents());
  }

  private async getTerm(termId: TermId): Promise<Word> {
    const term = (await this.termRepository.findById(termId)) as Word | undefined;
    if (!term) {
      throw new TermDoesNotExistsException(termId.toString());
    }

    return term;
  }
}
