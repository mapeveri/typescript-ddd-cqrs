import { ASYNC_EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import CreateExpressionCommand from './createExpressionCommand';
import Expression from '@src/languages/domain/term/expression/expression';
import CountryId from '@src/languages/domain/country/countryId';
import ExpressionTermCollection from '@src/languages/domain/term/expression/expressionTermCollection';
import UserId from '@src/account/domain/user/userId';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import TermRepository, { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import TermId from '@src/languages/domain/term/termId';
import TermAlreadyExistsException from '@src/languages/domain/term/termAlreadyExistsException';

@CommandHandler(CreateExpressionCommand)
export default class CreateExpressionCommandHandler implements ICommandHandler<CreateExpressionCommand> {
  constructor(
    @Inject(TERM_REPOSITORY) private readonly termRepository: TermRepository,
    @Inject(ASYNC_EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateExpressionCommand): Promise<void> {
    const id = TermId.of(command.id);
    await this.guardExpressionDoesNotExists(id);

    const expression = Expression.create(
      id,
      command.languageId,
      CountryId.of(command.countryId),
      ExpressionTermCollection.of(command.terms),
      UserId.of(command.userId),
    );

    this.termRepository.save(expression);

    void this.eventBus.publish(expression.pullDomainEvents());
  }

  private async guardExpressionDoesNotExists(id: TermId): Promise<void> {
    const expression = await this.termRepository.findById(id);
    if (expression) {
      throw new TermAlreadyExistsException(id.toString());
    }
  }
}
