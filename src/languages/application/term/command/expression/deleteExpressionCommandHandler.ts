import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import DeleteExpressionCommand from './deleteExpressionCommand';
import TermRepository, { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import TermId from '@src/languages/domain/term/termId';

@CommandHandler(DeleteExpressionCommand)
export default class DeleteExpressionCommandHandler implements ICommandHandler<DeleteExpressionCommand> {
  constructor(@Inject(TERM_REPOSITORY) private readonly termRepository: TermRepository) {}

  async execute(command: DeleteExpressionCommand): Promise<void> {
    const expression = await this.termRepository.findById(TermId.of(command.id));
    if (!expression) return;

    await this.termRepository.remove(expression);
  }
}
