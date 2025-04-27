import { expect } from 'vitest';
import { WordTermPrimitives } from '@src/language/domain/term/word/wordTerm';
import UpdateWordCommand from '@src/language/application/term/command/word/updateWordCommand';
import WordUpdatedEvent from '@src/language/domain/term/word/wordUpdatedEvent';

export class WordUpdatedEventMother {
  static createFromUpdatedWordCommand(command: UpdateWordCommand): WordUpdatedEvent {
    const terms = command.terms.map((term: { [key: string]: any }): WordTermPrimitives => {
      return {
        word: term['word'],
        description: term['description'],
        example: term['example'],
        hashtags: term['hashtags'],
      };
    });

    const eventId = expect.any(String) as unknown as string;
    return new WordUpdatedEvent(command.id, command.languageId, command.countryId, command.userId, terms, eventId);
  }
}
