import Uuid from '../../../../../shared/domain/uuid';
import WordCreatedEvent from '../../../../../languages/domain/word/domainEvents/wordCreatedEvent';
import { CommandBus } from '../../../../../shared/domain/buses/commandBus/commandBus';
import { EventHandler } from '../../../../../shared/domain/buses/eventBus/eventHandler';
import CreateTermCommand from '../../command/create/createTermCommand';
import { WORD } from '../../../../../languages/domain/term/term';
import { WordTerm } from '../../../../../languages/domain/word/word';

export default class CreateOrUpdateUserOnAuthenticationEventHandler implements EventHandler {
  constructor(private commandBus: CommandBus) {}

  async handle(event: WordCreatedEvent): Promise<void> {
    const terms = event.terms;

    terms.forEach(async (term: WordTerm) => {
      await this.commandBus.dispatch(
        new CreateTermCommand(
          Uuid.next(),
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
