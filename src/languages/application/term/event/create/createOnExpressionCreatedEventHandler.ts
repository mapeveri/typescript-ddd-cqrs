import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import CreateTermCommand from '../../command/create/createTermCommand';
import ExpressionCreatedEvent from '@src/languages/domain/expression/domainEvents/expressionCreatedEvent';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EventsHandler, IEventHandler } from '@src/shared/domain/buses/eventBus/eventsHandler';
import { TermTypeEnum } from '@src/languages/domain/term/valueObjects/termType';

@EventsHandler(ExpressionCreatedEvent)
export default class CreateOnExpressionCreatedEventHandler implements IEventHandler<ExpressionCreatedEvent> {
  constructor(@Inject(COMMAND_BUS) private readonly commandBus: CommandBus) {}

  async handle(event: ExpressionCreatedEvent): Promise<void> {
    const terms = event.terms;

    for (const term of terms) {
      await this.commandBus.dispatch(
        new CreateTermCommand(
          event.aggregateId,
          term['expression'],
          term['description'],
          term['example'],
          term['hashtags'],
          TermTypeEnum.EXPRESSION
        )
      );
    }
  }
}
