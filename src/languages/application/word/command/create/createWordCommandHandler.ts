import WordRepository from '@src/languages/domain/word/wordRepository';
import { CommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import { EventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import CreateWordCommand from './createWordCommand';
import Word from '@src/languages/domain/word/word';
import WordId from '@src/languages/domain/word/valueObjects/wordId';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import WordTermCollection from '@src/languages/domain/word/valueObjects/wordTermCollection';
import WordAlreadyExistsException from '@src/languages/domain/word/exceptions/WordAlreadyExistsException';

export default class CreateWordCommandHandler implements CommandHandler {
  constructor(private wordRepository: WordRepository, private eventBus: EventBus) {}

  async handle(command: CreateWordCommand): Promise<void> {
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

    await this.eventBus.publish(word.pullDomainEvents());
  }

  private async checkWordDoesNotExists(wordId: WordId): Promise<void> {
    const word = await this.wordRepository.findById(wordId);
    if (word) {
      throw new WordAlreadyExistsException(`Word with id ${wordId.toString()} already exists`);
    }
  }
}
