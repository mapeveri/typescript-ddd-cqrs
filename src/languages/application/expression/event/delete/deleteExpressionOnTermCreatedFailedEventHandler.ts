import { COMMAND_BUS, CommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EventsHandler, IEventHandler } from '@src/shared/domain/bus/eventBus/eventsHandler';
import TermType from '@src/languages/domain/term/valueObjects/termType';
import TermViewCreatedFailedEvent from '@src/languages/application/term/projection/termViewCreatedFailedEvent';
import DeleteExpressionCommand from '../../command/delete/deleteExpressionCommand';

@EventsHandler(TermViewCreatedFailedEvent)
export default class DeleteExpressionOnTermCreatedFailedEventHandler
  implements IEventHandler<TermViewCreatedFailedEvent>
{
  constructor(@Inject(COMMAND_BUS) private readonly commandBus: CommandBus) {}

  async handle(event: TermViewCreatedFailedEvent): Promise<void> {
    const termType = TermType.of(event.type);
    if (!termType.isExpression()) {
      return;
    }

    await this.commandBus.dispatch(new DeleteExpressionCommand(event.aggregateId));
  }
}
