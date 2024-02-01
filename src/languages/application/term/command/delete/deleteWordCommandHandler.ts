import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import DeleteWordCommand from './deleteWordCommand';
import TermRepository, { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import TermId from '@src/languages/domain/term/termId';

@CommandHandler(DeleteWordCommand)
export default class DeleteWordCommandHandler implements ICommandHandler<DeleteWordCommand> {
  constructor(@Inject(TERM_REPOSITORY) private readonly termRepository: TermRepository) {}

  async execute(command: DeleteWordCommand): Promise<void> {
    const word = await this.termRepository.findById(TermId.of(command.id));
    if (!word) return;

    await this.termRepository.remove(word);
  }
}
