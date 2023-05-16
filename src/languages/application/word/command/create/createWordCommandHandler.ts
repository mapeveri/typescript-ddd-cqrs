import Word, { WordTerm } from '../../../../../languages/domain/word/word';
import WordRepository from '../../../../../languages/domain/word/wordRepository';
import { CommandHandler } from '../../../../../shared/domain/buses/commandBus/commandHandler';
import CreateWordCommand from './createWordCommand';
import { EventBus } from '../../../../../shared/domain/buses/eventBus/eventBus';
import UserId from '../../../../../languages/domain/user/valueObjects/userId';
import CountryId from '../../../../../languages/domain/country/valueObjects/countryId';
import WordId from '../../../../../languages/domain/word/valueObjects/wordId';

export default class CreateWordCommandHandler implements CommandHandler {
  constructor(private wordRepository: WordRepository, private eventBus: EventBus) {}

  async handle(command: CreateWordCommand): Promise<void> {
    const terms: WordTerm[] = this.getWordTerms(command.terms);

    const word = Word.create(
      new WordId(command.id),
      command.languageId,
      new CountryId(command.countryId),
      terms,
      new UserId(command.userId)
    );

    await this.wordRepository.save(word);

    this.eventBus.publish(word.pullDomainEvents());
  }

  private getWordTerms(terms: Array<{ [key: string]: string }>): WordTerm[] {
    return terms.map((term: { [key: string]: any }): WordTerm => {
      return {
        title: term['title'],
        description: term['description'],
        example: term['example'],
        taggedWords: term['tagged_words'],
      };
    });
  }
}
