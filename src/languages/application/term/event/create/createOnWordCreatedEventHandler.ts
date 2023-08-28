import WordCreatedEvent from '@src/languages/domain/word/domainEvents/wordCreatedEvent';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import CreateTermCommand from '../../command/create/createTermCommand';
import { Uuid } from '@src/shared/domain/valueObjects/uuid';
import { WORD } from '@src/languages/domain/term/term';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WordCreatedEvent)
export default class CreateOnWordCreatedEventHandler implements IEventHandler<WordCreatedEvent> {
  constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus) {}

  async handle(event: WordCreatedEvent): Promise<void> {
    const terms = event.terms;

    for (const term of terms) {
      await this.commandBus.dispatch(
        new CreateTermCommand(
          Uuid.random().toString(),
          term['word'],
          term['description'],
          term['example'],
          term['hashtags'],
          WORD
        )
      );
    }
  }
}
