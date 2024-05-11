import { EventsHandler, IEventHandler } from '@src/shared/domain/bus/eventBus/eventsHandler';
import TermLikeAddedEvent from '@src/languages/domain/term/termLikeAddedEvent';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { PROJECTION_BUS, ProjectionBus } from '@src/shared/domain/bus/projectionBus/projectionBus';
import AddLikeToTermProjection from '@src/languages/application/term/projection/addLikeToTermProjection';

@EventsHandler(TermLikeAddedEvent)
export default class UpdateTermsOnTermLikeAddedEventHandler implements IEventHandler<TermLikeAddedEvent> {
  constructor(@Inject(PROJECTION_BUS) private readonly projectionBus: ProjectionBus) {}

  async handle(event: TermLikeAddedEvent): Promise<void> {
    await this.projectionBus.dispatch(new AddLikeToTermProjection(event.id, event.userId, event.name, event.photo));
  }
}
