import { EventsHandler, IEventHandler } from '@src/shared/domain/bus/eventBus/eventsHandler';
import TermLikeAddedEvent from '@src/languages/domain/term/termLikeAddedEvent';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { PROJECTION_BUS, ProjectionBus } from '@src/shared/domain/bus/projectionBus/projectionBus';
import AddLikeToTermViewProjection from '@src/languages/application/term/projection/addLikeToTermViewProjection';

@EventsHandler(TermLikeAddedEvent)
export default class UpdateTermViewOnTermLikeAddedEventHandler implements IEventHandler<TermLikeAddedEvent> {
  constructor(@Inject(PROJECTION_BUS) private readonly projectionBus: ProjectionBus) {}

  async handle(event: TermLikeAddedEvent): Promise<void> {
    await this.projectionBus.dispatch(new AddLikeToTermViewProjection(event.id, event.userId, event.name, event.photo));
  }
}
