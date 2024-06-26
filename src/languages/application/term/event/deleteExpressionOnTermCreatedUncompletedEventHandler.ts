import { COMMAND_BUS, CommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EventsHandler, IEventHandler } from '@src/shared/domain/bus/eventBus/eventsHandler';
import TermType from '@src/languages/domain/term/termType';
import TermCreatedUncompletedEvent from '@src/languages/domain/term/termCreatedUncompletedEvent';
import DeleteExpressionCommand from '@src/languages/application/term/command/expression/deleteExpressionCommand';

@EventsHandler(TermCreatedUncompletedEvent)
export default class DeleteExpressionOnTermCreatedUncompletedEventHandler
  implements IEventHandler<TermCreatedUncompletedEvent>
{
  constructor(@Inject(COMMAND_BUS) private readonly commandBus: CommandBus) {}

  async handle(event: TermCreatedUncompletedEvent): Promise<void> {
    const termType = TermType.of(event.type);
    if (!termType.isExpression()) {
      return;
    }

    await this.commandBus.dispatch(new DeleteExpressionCommand(event.aggregateId));
  }
}
