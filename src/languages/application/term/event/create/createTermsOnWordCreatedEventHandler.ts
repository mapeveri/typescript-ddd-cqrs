import WordCreatedEvent from '@src/languages/domain/term/word/wordCreatedEvent';
import CreateTermProjection from '@src/languages/application/term/projection/create/createTermProjection';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EventsHandler, IEventHandler } from '@src/shared/domain/bus/eventBus/eventsHandler';
import { TermTypeEnum } from '@src/languages/domain/term/termType';
import { PROJECTION_BUS, ProjectionBus } from '@src/shared/domain/bus/projectionBus/projectionBus';

@EventsHandler(WordCreatedEvent)
export default class CreateTermsOnWordCreatedEventHandler implements IEventHandler<WordCreatedEvent> {
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
          new Date(event.occurredOn),
        ),
      );
    }
  }
}
