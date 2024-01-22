import { expect } from '@jest/globals';
import CreateWordCommand from '@src/languages/application/term/command/create/createWordCommand';
import WordCreatedEvent from '@src/languages/domain/term/word/domainEvents/wordCreatedEvent';
import { WordTermPrimitives } from '@src/languages/domain/term/word/valueObjects/wordTerm';

export class WordCreatedEventMother {
  static createFromCreateWordCommand(command: CreateWordCommand): WordCreatedEvent {
    const terms = command.terms.map((term: { [key: string]: any }): WordTermPrimitives => {
      return {
        word: term['word'],
        description: term['description'],
        example: term['example'],
        hashtags: term['hashtags'],
      };
    });

    const eventId = expect.any(String) as unknown as string;
    return new WordCreatedEvent(command.id, command.languageId, command.countryId, command.userId, terms, eventId);
  }
}
