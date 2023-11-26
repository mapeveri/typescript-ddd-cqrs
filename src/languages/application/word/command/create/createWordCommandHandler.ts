import WordRepository, { WORD_REPOSITORY } from '@src/languages/domain/word/wordRepository';
import { EVENT_BUS, EventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import CreateWordCommand from './createWordCommand';
import Word from '@src/languages/domain/word/word';
import WordId from '@src/languages/domain/word/valueObjects/wordId';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import WordTermCollection from '@src/languages/domain/word/valueObjects/wordTermCollection';
import WordAlreadyExistsException from '@src/languages/domain/word/exceptions/WordAlreadyExistsException';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';

@CommandHandler(CreateWordCommand)
export default class CreateWordCommandHandler implements ICommandHandler<CreateWordCommand> {
  constructor(
    @Inject(WORD_REPOSITORY) private readonly wordRepository: WordRepository,
    @Inject(EVENT_BUS) private readonly eventBus: EventBus
  ) {}

  async execute(command: CreateWordCommand): Promise<void> {
    const wordId = WordId.of(command.id);
    await this.checkWordDoesNotExists(wordId);

    const word = Word.create(
      wordId,
      command.languageId,
      CountryId.of(command.countryId),
      WordTermCollection.of(command.terms),
      UserId.of(command.userId)
    );

    await this.wordRepository.save(word);

    void this.eventBus.publish(word.pullDomainEvents());
  }

  private async checkWordDoesNotExists(wordId: WordId): Promise<void> {
    const word = await this.wordRepository.findById(wordId);
    if (word) {
      throw new WordAlreadyExistsException(wordId.toString());
    }
  }
}
