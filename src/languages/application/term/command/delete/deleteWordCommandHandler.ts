import ExpressionId from '@src/languages/domain/term/expression/valueObjects/expressionId';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import DeleteWordCommand from './deleteWordCommand';
import WordRepository, { WORD_REPOSITORY } from '@src/languages/domain/term/word/wordRepository';

@CommandHandler(DeleteWordCommand)
export default class DeleteWordCommandHandler implements ICommandHandler<DeleteWordCommand> {
  constructor(@Inject(WORD_REPOSITORY) private readonly wordRepository: WordRepository) {}

  async execute(command: DeleteWordCommand): Promise<void> {
    const word = await this.wordRepository.findById(ExpressionId.of(command.id));
    if (!word) return;

    await this.wordRepository.remove(word);
  }
}
