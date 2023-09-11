import ExpressionRepository, { EXPRESSION_REPOSITORY } from '@src/languages/domain/expression/expressionRepository';
import ExpressionId from '@src/languages/domain/expression/valueObjects/expressionId';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import DeleteExpressionCommand from './deleteExpressionCommand';

@CommandHandler(DeleteExpressionCommand)
export default class DeleteExpressionCommandHandler implements ICommandHandler<DeleteExpressionCommand> {
  constructor(@Inject(EXPRESSION_REPOSITORY) private expressionRepository: ExpressionRepository) {}

  async execute(command: DeleteExpressionCommand): Promise<void> {
    const expression = await this.expressionRepository.findById(ExpressionId.of(command.id));
    if (!expression) return;
    await this.expressionRepository.delete(expression);
  }
}
