import WordCreatedEvent from '../../../../../languages/domain/word/domainEvents/wordCreatedEvent';
import { CommandBus } from '../../../../../shared/domain/buses/commandBus/commandBus';
import { EventHandler } from '../../../../../shared/domain/buses/eventBus/eventHandler';
import CreateTermCommand from '../../command/create/createTermCommand';
import { WORD } from '../../../../../languages/domain/term/term';
import { Uuid } from '../../../../../shared/domain/valueObjects/uuid';
import { WordTerm } from '../../../../../languages/domain/word/valueObjects/term';

export default class CreateOnWordCreatedEventHandler implements EventHandler {
  constructor(private commandBus: CommandBus) {}

  async handle(event: WordCreatedEvent): Promise<void> {
    const terms = event.terms;

    terms.forEach(async (term: WordTerm) => {
      await this.commandBus.dispatch(
        new CreateTermCommand(
          Uuid.random().toString(),
          term['title'],
          term['description'],
          term['example'],
          term['taggedWords'],
          WORD
        )
      );
    });
  }
}
