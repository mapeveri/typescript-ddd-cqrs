import { EventsHandler, IEventHandler } from '@src/shared/domain/bus/eventBus/eventsHandler';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { PROJECTION_BUS, ProjectionBus } from '@src/shared/domain/bus/projectionBus/projectionBus';
import TermDislikedEvent from '@src/languages/domain/term/termDislikedEvent';
import DislikeToTermViewProjection from '@src/languages/application/term/projection/dislikeToTermViewProjection';

@EventsHandler(TermDislikedEvent)
export default class UpdateTermViewOnTermDislikedEventHandler implements IEventHandler<TermDislikedEvent> {
  constructor(@Inject(PROJECTION_BUS) private readonly projectionBus: ProjectionBus) {}

  async handle(event: TermDislikedEvent): Promise<void> {
    await this.projectionBus.dispatch(new DislikeToTermViewProjection(event.id, event.userId));
  }
}
