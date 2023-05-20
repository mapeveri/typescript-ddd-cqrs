import CreateWordCommand from '@src/languages/application/word/command/create/createWordCommand';
import WordCreatedEvent from '@src/languages/domain/word/domainEvents/wordCreatedEvent';
import { WordTermDTO } from '@src/languages/domain/word/valueObjects/wordTerm';

export class WordCreatedEventMother {
  static createFromCreateWordCommand(command: CreateWordCommand): WordCreatedEvent {
    const terms = command.terms.map((term: { [key: string]: any }): WordTermDTO => {
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
