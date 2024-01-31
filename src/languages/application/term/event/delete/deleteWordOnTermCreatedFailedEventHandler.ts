import { COMMAND_BUS, CommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EventsHandler, IEventHandler } from '@src/shared/domain/bus/eventBus/eventsHandler';
import TermType from '@src/languages/domain/term/termType';
import TermViewCreatedFailedEvent from '@src/languages/application/term/viewModel/termViewCreatedFailedEvent';
import DeleteWordCommand from '../../command/delete/deleteWordCommand';

@EventsHandler(TermViewCreatedFailedEvent)
export default class DeleteWordOnTermCreatedFailedEventHandler implements IEventHandler<TermViewCreatedFailedEvent> {
  constructor(@Inject(COMMAND_BUS) private readonly commandBus: CommandBus) {}

  async handle(event: TermViewCreatedFailedEvent): Promise<void> {
    const termType = TermType.of(event.type);
    if (!termType.isWord()) {
      return;
    }

    await this.commandBus.dispatch(new DeleteWordCommand(event.aggregateId));
  }
}
