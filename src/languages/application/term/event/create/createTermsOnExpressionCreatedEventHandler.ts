import CreateTermProjection from '@src/languages/application/term/projection/create/createTermProjection';
import ExpressionCreatedEvent from '@src/languages/domain/term/expression/domainEvents/expressionCreatedEvent';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EventsHandler, IEventHandler } from '@src/shared/domain/bus/eventBus/eventsHandler';
import { TermTypeEnum } from '@src/languages/domain/term/valueObjects/termType';
import { PROJECTION_BUS, ProjectionBus } from '@src/shared/domain/bus/projectionBus/projectionBus';

@EventsHandler(ExpressionCreatedEvent)
export default class CreateTermsOnExpressionCreatedEventHandler implements IEventHandler<ExpressionCreatedEvent> {
  constructor(@Inject(PROJECTION_BUS) private readonly projectionBus: ProjectionBus) {}

  async handle(event: ExpressionCreatedEvent): Promise<void> {
    for (const term of event.terms) {
      await this.projectionBus.dispatch(
        new CreateTermProjection(
          event.aggregateId,
          term['expression'],
          term['description'],
          term['example'],
          term['hashtags'],
          TermTypeEnum.EXPRESSION,
          new Date(event.occurredOn),
        ),
      );
    }
  }
}
