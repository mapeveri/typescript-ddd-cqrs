import ExpressionId from '@src/languages/domain/expression/valueObjects/expressionId';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import DeleteWordCommand from './deleteWordCommand';
import WordRepository, { WORD_REPOSITORY } from '@src/languages/domain/word/wordRepository';

@CommandHandler(DeleteWordCommand)
export default class DeleteWordCommandHandler implements ICommandHandler<DeleteWordCommand> {
  constructor(@Inject(WORD_REPOSITORY) private readonly wordRepository: WordRepository) {}

  async execute(command: DeleteWordCommand): Promise<void> {
    const word = await this.wordRepository.findById(ExpressionId.of(command.id));
    if (!word) return;

    await this.wordRepository.remove(word);
  }
}
