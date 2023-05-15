import Word, { WordTerm } from '../../../../../languages/domain/word/word';
import WordRepository from '../../../../../languages/domain/word/wordRepository';
import { CommandHandler } from '../../../../../shared/domain/buses/commandBus/commandHandler';
import CreateWordCommand from './createWordCommand';
import { EventBus } from '../../../../../shared/domain/buses/eventBus/eventBus';
import UserRepository from '../../../../../languages/domain/user/userRepository';
import User from '../../../../../languages/domain/user/user';
import UserDoesNotExistsException from '../../../../../languages/domain/user/exceptions/userDoesNotExistsException';
import UserId from '../../../../domain/user/valueObjects/userId';

export default class CreateWordCommandHandler implements CommandHandler {
  constructor(
    private wordRepository: WordRepository,
    private userRepository: UserRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: CreateWordCommand): Promise<void> {
    const user: User = await this.getUser(command.userId);

    const terms: WordTerm[] = this.getWordTerms(command.terms);

    const word = Word.create(command.id, command.languageId, command.countryId, terms, user);

    await this.wordRepository.save(word);

    this.eventBus.publish(word.pullDomainEvents());
  }

  private async getUser(userId: string): Promise<User> {
    const user = await this.userRepository.findById(new UserId(userId));
    if (null === user) {
      throw new UserDoesNotExistsException();
    }

    return user;
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
