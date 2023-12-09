import WordCreatedEvent from '@src/languages/domain/word/domainEvents/wordCreatedEvent';
import CreateTermProjection from '@src/languages/application/term/projection/create/createTermProjection';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EventsHandler, IEventHandler } from '@src/shared/domain/buses/eventBus/eventsHandler';
import { TermTypeEnum } from '@src/languages/domain/term/valueObjects/termType';
import { PROJECTION_BUS, ProjectionBus } from '@src/shared/domain/buses/projectionBus/projectionBus';

@EventsHandler(WordCreatedEvent)
export default class CreateOnWordCreatedEventHandler implements IEventHandler<WordCreatedEvent> {
  constructor(@Inject(PROJECTION_BUS) private readonly projectionBus: ProjectionBus) {}

  async handle(event: WordCreatedEvent): Promise<void> {
    for (const term of event.terms) {
      await this.projectionBus.dispatch(
        new CreateTermProjection(
          event.aggregateId,
          term['word'],
          term['description'],
          term['example'],
          term['hashtags'],
          TermTypeEnum.WORD,
        ),
      );
    }
  }
}
