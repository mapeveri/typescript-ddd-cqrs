import WordRepository from '@src/languages/domain/word/wordRepository';
import { CommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import { EventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import CreateWordCommand from './createWordCommand';
import Word from '@src/languages/domain/word/word';
import WordId from '@src/languages/domain/word/valueObjects/wordId';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import WordTermCollection from '@src/languages/domain/word/valueObjects/wordTermCollection';

export default class CreateWordCommandHandler implements CommandHandler {
  constructor(private wordRepository: WordRepository, private eventBus: EventBus) {}

  async handle(command: CreateWordCommand): Promise<void> {
    const word = Word.create(
      WordId.of(command.id),
      command.languageId,
      CountryId.of(command.countryId),
      WordTermCollection.of(command.terms),
      UserId.of(command.userId)
    );

    await this.wordRepository.save(word);

    await this.eventBus.publish(word.pullDomainEvents());
  }
}
