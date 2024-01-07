import { COMMAND_BUS, CommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EventsHandler, IEventHandler } from '@src/shared/domain/bus/eventBus/eventsHandler';
import TermType from '@src/languages/domain/term/valueObjects/termType';
import TermCreatedFailedEvent from '@src/languages/domain/term/domainEvents/termCreatedFailedEvent';
import DeleteWordCommand from '../../command/delete/deleteWordCommand';

@EventsHandler(TermCreatedFailedEvent)
export default class DeleteWordOnTermCreatedFailedEventHandler implements IEventHandler<TermCreatedFailedEvent> {
  constructor(@Inject(COMMAND_BUS) private readonly commandBus: CommandBus) {}

  async handle(event: TermCreatedFailedEvent): Promise<void> {
    const termType = TermType.of(event.type);
    if (!termType.isWord()) {
      return;
    }

    await this.commandBus.dispatch(new DeleteWordCommand(event.aggregateId));
  }
}
