import { expect } from 'vitest';
import CreateWordCommand from '@src/languages/application/term/command/word/createWordCommand';
import WordCreatedEvent from '@src/languages/domain/term/word/wordCreatedEvent';
import { WordTermPrimitives } from '@src/languages/domain/term/word/wordTerm';

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
