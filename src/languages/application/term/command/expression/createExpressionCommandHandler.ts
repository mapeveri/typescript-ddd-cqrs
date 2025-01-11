import { ASYNC_EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import CreateExpressionCommand from './createExpressionCommand';
import Expression from '@src/languages/domain/term/expression/expression';
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
    await this.guardExpressionDoesNotExists(command.id);

    const expression = Expression.create(
      command.id,
      command.languageId,
      command.countryId,
      command.terms,
      command.userId,
    );

    this.termRepository.save(expression);

    void this.eventBus.publish(expression.pullDomainEvents());
  }

  private async guardExpressionDoesNotExists(id: string): Promise<void> {
    const expression = await this.termRepository.findById(TermId.of(id));
    if (expression) {
      throw new TermAlreadyExistsException(id.toString());
    }
  }
}
