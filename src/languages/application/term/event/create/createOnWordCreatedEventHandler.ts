import WordCreatedEvent from '@src/languages/domain/word/domainEvents/wordCreatedEvent';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import CreateTermCommand from '../../command/create/createTermCommand';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EventsHandler, IEventHandler } from '@src/shared/domain/buses/eventBus/eventsHandler';
import { TermTypeEnum } from '@src/languages/domain/term/valueObjects/termType';

@EventsHandler(WordCreatedEvent)
export default class CreateOnWordCreatedEventHandler implements IEventHandler<WordCreatedEvent> {
  constructor(@Inject(COMMAND_BUS) private readonly commandBus: CommandBus) {}

  async handle(event: WordCreatedEvent): Promise<void> {
    const terms = event.terms;

    for (const term of terms) {
      await this.commandBus.dispatch(
        new CreateTermCommand(
          event.aggregateId,
          term['word'],
          term['description'],
          term['example'],
          term['hashtags'],
          TermTypeEnum.WORD
        )
      );
    }
  }
}
