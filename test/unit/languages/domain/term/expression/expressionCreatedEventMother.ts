import { expect } from 'vitest';
import CreateExpressionCommand from '@src/languages/application/term/command/expression/createExpressionCommand';
import ExpressionCreatedEvent from '@src/languages/domain/term/expression/expressionCreatedEvent';
import { ExpressionTermPrimitives } from '@src/languages/domain/term/expression/expressionTerm';

export class ExpressionCreatedEventMother {
  static createFromCreateExpressionCommand(command: CreateExpressionCommand): ExpressionCreatedEvent {
    const terms = command.terms.map((term: { [key: string]: any }): ExpressionTermPrimitives => {
      return {
        expression: term['expression'],
        description: term['description'],
        example: term['example'],
        hashtags: term['hashtags'],
      };
    });

    const eventId = expect.any(String) as unknown as string;
    return new ExpressionCreatedEvent(
      command.id,
      command.languageId,
      command.countryId,
      command.userId,
      terms,
      eventId,
    );
  }
}
