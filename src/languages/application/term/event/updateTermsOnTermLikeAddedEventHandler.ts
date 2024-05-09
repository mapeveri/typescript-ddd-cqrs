import { EventsHandler, IEventHandler } from '@src/shared/domain/bus/eventBus/eventsHandler';
import TermLikeAddedEvent from '@src/languages/domain/term/termLikeAddedEvent';

@EventsHandler(TermLikeAddedEvent)
export default class UpdateTermsOnTermLikeAddedEventHandler implements IEventHandler<TermLikeAddedEvent> {
  async handle(event: TermLikeAddedEvent): Promise<void> {
    console.log(event);
  }
}
