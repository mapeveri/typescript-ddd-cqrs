import CreateWordCommand from '@src/languages/application/word/command/create/createWordCommand';
import WordCreatedEvent from '@src/languages/domain/word/domainEvents/wordCreatedEvent';
import { WordTerm } from '@src/languages/domain/word/valueObjects/term';

export class WordCreatedEventMother {
  static createFromCreateWordCommand(command: CreateWordCommand): WordCreatedEvent {
    const terms = command.terms.map((term: { [key: string]: any }): WordTerm => {
      return {
        title: term['title'],
        description: term['description'],
        example: term['example'],
        taggedWords: term['tagged_words'],
      };
    });
    return new WordCreatedEvent(command.id, command.languageId, command.countryId, command.userId, terms);
  }
}
