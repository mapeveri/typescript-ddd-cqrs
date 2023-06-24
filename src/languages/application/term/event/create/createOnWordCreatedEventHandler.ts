import WordCreatedEvent from '@src/languages/domain/word/domainEvents/wordCreatedEvent';
import { WordTermPrimitives } from '@src/languages/domain/word/valueObjects/wordTerm';
import { CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import { EventHandler } from '@src/shared/domain/buses/eventBus/eventHandler';
import CreateTermCommand from '../../command/create/createTermCommand';
import { Uuid } from '@src/shared/domain/valueObjects/uuid';
import { WORD } from '@src/languages/domain/term/term';

export default class CreateOnWordCreatedEventHandler implements EventHandler {
  constructor(private commandBus: CommandBus) {}

  async handle(event: WordCreatedEvent): Promise<void> {
    const terms = event.terms;

    terms.forEach(async (term: WordTermPrimitives) => {
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
    });
  }
}
