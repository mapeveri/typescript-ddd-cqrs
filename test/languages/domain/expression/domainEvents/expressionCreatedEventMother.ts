import { expect } from '@jest/globals';
import CreateExpressionCommand from '@src/languages/application/expression/command/create/createExpressionCommand';
import ExpressionCreatedEvent from '@src/languages/domain/expression/domainEvents/expressionCreatedEvent';
import { ExpressionTermDTO } from '@src/languages/domain/expression/valueObjects/expressionTerm';

export class ExpressionCreatedEventMother {
  static createFromCreateExpressionCommand(command: CreateExpressionCommand): ExpressionCreatedEvent {
    const terms = command.terms.map((term: { [key: string]: any }): ExpressionTermDTO => {
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
      eventId
    );
  }
}
