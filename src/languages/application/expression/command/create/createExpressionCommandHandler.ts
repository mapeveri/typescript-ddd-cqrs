import ExpressionRepository from '@src/languages/domain/expression/expressionRepository';
import { CommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import { EventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import CreateExpressionCommand from './createExpressionCommand';
import ExpressionId from '@src/languages/domain/expression/valueObjects/expressionId';
import Expression from '@src/languages/domain/expression/expression';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import ExpressionTermCollection from '@src/languages/domain/expression/valueObjects/expressionTermCollection';
import UserId from '@src/languages/domain/user/valueObjects/userId';

export default class CreateExpressionCommandHandler implements CommandHandler {
  constructor(private expressionRepository: ExpressionRepository, private eventBus: EventBus) {}

  async handle(command: CreateExpressionCommand): Promise<void> {
    const expression = Expression.create(
      new ExpressionId(command.id),
      command.languageId,
      new CountryId(command.countryId),
      ExpressionTermCollection.create(command.terms),
      new UserId(command.userId)
    );

    await this.expressionRepository.save(expression);

    this.eventBus.publish(expression.pullDomainEvents());
  }
}
