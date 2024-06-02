import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import TermCreatedUncompletedEvent from '@src/languages/domain/term/termCreatedUncompletedEvent';
import TermViewSaver, { TERM_VIEW_SAVER } from '@src/languages/infrastructure/projection/termViewSaver';
import { EventsHandler, IEventHandler } from '@src/shared/domain/bus/eventBus/eventsHandler';
import { TermTypeEnum } from '@src/languages/domain/term/termType';
import WordCreatedEvent from '@src/languages/domain/term/word/wordCreatedEvent';

@EventsHandler(WordCreatedEvent)
export default class CreateWordTermViewProjectionHandler implements IEventHandler<WordCreatedEvent> {
  constructor(
    @Inject(TERM_VIEW_SAVER) private readonly termViewSaver: TermViewSaver,
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async handle(event: WordCreatedEvent): Promise<void> {
    const termType = TermTypeEnum.WORD;
    for (const term of event.terms) {
      try {
        await this.termViewSaver.save({
          id: event.aggregateId,
          title: term['word'],
          description: term['description'],
          example: term['example'],
          type: termType,
          hashtags: term['hashtags'],
          totalLikes: 0,
          likes: [],
          createdAt: new Date(event.occurredOn).toISOString(),
        });
      } catch (e) {
        void this.eventBus.publish([new TermCreatedUncompletedEvent(event.aggregateId, termType)]);
        throw e;
      }
    }
  }
}
