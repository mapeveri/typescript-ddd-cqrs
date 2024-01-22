import ExpressionRepository, {
  EXPRESSION_REPOSITORY,
} from '@src/languages/domain/term/expression/expressionRepository';
import { ASYNC_EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import CreateExpressionCommand from './createExpressionCommand';
import ExpressionId from '@src/languages/domain/term/expression/valueObjects/expressionId';
import Expression from '@src/languages/domain/term/expression/expression';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import ExpressionTermCollection from '@src/languages/domain/term/expression/valueObjects/expressionTermCollection';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import ExpressionAlreadyExistsException from '@src/languages/domain/term/expression/exceptions/expressionAlreadyExistsException';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';

@CommandHandler(CreateExpressionCommand)
export default class CreateExpressionCommandHandler implements ICommandHandler<CreateExpressionCommand> {
  constructor(
    @Inject(EXPRESSION_REPOSITORY) private readonly expressionRepository: ExpressionRepository,
    @Inject(ASYNC_EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateExpressionCommand): Promise<void> {
    const expressionId = ExpressionId.of(command.id);
    await this.guardExpressionDoesNotExists(expressionId);

    const expression = Expression.create(
      expressionId,
      command.languageId,
      CountryId.of(command.countryId),
      ExpressionTermCollection.of(command.terms),
      UserId.of(command.userId),
    );

    await this.expressionRepository.save(expression);

    void this.eventBus.publish(expression.pullDomainEvents());
  }

  private async guardExpressionDoesNotExists(expressionId: ExpressionId): Promise<void> {
    const expression = await this.expressionRepository.findById(expressionId);
    if (expression) {
      throw new ExpressionAlreadyExistsException(expressionId.toString());
    }
  }
}
