import ExpressionRepository, { EXPRESSION_REPOSITORY } from '@src/languages/domain/expression/expressionRepository';
import { EVENT_BUS, EventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import CreateExpressionCommand from './createExpressionCommand';
import ExpressionId from '@src/languages/domain/expression/valueObjects/expressionId';
import Expression from '@src/languages/domain/expression/expression';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import ExpressionTermCollection from '@src/languages/domain/expression/valueObjects/expressionTermCollection';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import ExpressionAlreadyExistsException from '@src/languages/domain/expression/exceptions/ExpressionAlreadyExistsException';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';

@CommandHandler(CreateExpressionCommand)
export default class CreateExpressionCommandHandler implements ICommandHandler<CreateExpressionCommand> {
  constructor(
    @Inject(EXPRESSION_REPOSITORY) private expressionRepository: ExpressionRepository,
    @Inject(EVENT_BUS) private eventBus: EventBus
  ) {}

  async execute(command: CreateExpressionCommand): Promise<void> {
    const expressionId = ExpressionId.of(command.id);
    await this.checkExpressionDoesNotExists(expressionId);

    const expression = Expression.create(
      expressionId,
      command.languageId,
      CountryId.of(command.countryId),
      ExpressionTermCollection.of(command.terms),
      UserId.of(command.userId)
    );

    await this.expressionRepository.save(expression);

    void this.eventBus.publish(expression.pullDomainEvents());
  }

  private async checkExpressionDoesNotExists(expressionId: ExpressionId): Promise<void> {
    const expression = await this.expressionRepository.findById(expressionId);
    if (expression) {
      throw new ExpressionAlreadyExistsException(`Expression with id ${expressionId.toString()} already exists`);
    }
  }
}
