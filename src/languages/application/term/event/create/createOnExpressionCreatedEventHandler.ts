import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import CreateTermCommand from '../../command/create/createTermCommand';
import { Uuid } from '@src/shared/domain/valueObjects/uuid';
import { EXPRESSION } from '@src/languages/domain/term/term';
import ExpressionCreatedEvent from '@src/languages/domain/expression/domainEvents/expressionCreatedEvent';
import { ExpressionTermPrimitives } from '@src/languages/domain/expression/valueObjects/expressionTerm';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ExpressionCreatedEvent)
export default class CreateOnExpressionCreatedEventHandler implements IEventHandler<ExpressionCreatedEvent> {
  constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus) {}

  async handle(event: ExpressionCreatedEvent): Promise<void> {
    const terms = event.terms;

    terms.forEach(async (term: ExpressionTermPrimitives) => {
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
