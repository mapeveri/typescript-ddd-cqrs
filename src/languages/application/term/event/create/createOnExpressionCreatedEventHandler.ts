import { CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import { EventHandler } from '@src/shared/domain/buses/eventBus/eventHandler';
import CreateTermCommand from '../../command/create/createTermCommand';
import { Uuid } from '@src/shared/domain/valueObjects/uuid';
import { EXPRESSION } from '@src/languages/domain/term/term';
import ExpressionCreatedEvent from '@src/languages/domain/expression/domainEvents/expressionCreatedEvent';
import { ExpressionTermDTO } from '@src/languages/domain/expression/valueObjects/expressionTerm';

export default class CreateOnExpressionCreatedEventHandler implements EventHandler {
  constructor(private commandBus: CommandBus) {}

  async handle(event: ExpressionCreatedEvent): Promise<void> {
    const terms = event.terms;

    terms.forEach(async (term: ExpressionTermDTO) => {
      await this.commandBus.dispatch(
        new CreateTermCommand(
          Uuid.random().toString(),
          term['expression'],
          term['description'],
          term['example'],
          term['hashtags'],
          EXPRESSION
        )
      );
    });
  }
}
