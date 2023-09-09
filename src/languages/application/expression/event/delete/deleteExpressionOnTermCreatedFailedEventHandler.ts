import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EventsHandler, IEventHandler } from '@src/shared/domain/buses/eventBus/eventsHandler';
import TermType from '@src/languages/domain/term/valueObjects/termType';
import TermCreatedFailedEvent from '@src/languages/domain/term/domainEvents/TermCreatedFailedEvent';
import DeleteExpressionCommand from '../../command/delete/deleteExpressionCommand';

@EventsHandler(TermCreatedFailedEvent)
export default class DeleteExpressionOnTermCreatedFailedEvent implements IEventHandler<TermCreatedFailedEvent> {
  constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus) {}

  async handle(event: TermCreatedFailedEvent): Promise<void> {
    const termType = TermType.of(event.type);
    if (!termType.isExpression()) {
      return;
    }

    await this.commandBus.dispatch(new DeleteExpressionCommand(event.aggregateId));
  }
}
