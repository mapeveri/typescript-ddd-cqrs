import { COMMAND_BUS, CommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EventsHandler, IEventHandler } from '@src/shared/domain/bus/eventBus/eventsHandler';
import TermCreatedUncompletedEvent from '@src/languages/domain/term/termCreatedUncompletedEvent';
import DeleteTermCommand from '../command/deleteTermCommand';

@EventsHandler(TermCreatedUncompletedEvent)
export default class DeleteTermOnTermCreatedUncompletedEventHandler
  implements IEventHandler<TermCreatedUncompletedEvent>
{
  constructor(@Inject(COMMAND_BUS) private readonly commandBus: CommandBus) {}

  async handle(event: TermCreatedUncompletedEvent): Promise<void> {
    await this.commandBus.dispatch(new DeleteTermCommand(event.aggregateId));
  }
}
