import CreateTermProjection from './createTermProjection';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import TermCreatedUncompletedEvent from '@src/languages/domain/term/termCreatedUncompletedEvent';
import { IProjectionHandler, ProjectionHandler } from '@src/shared/domain/bus/projectionBus/projectionHandler';
import TermViewSaver, { TERM_VIEW_SAVER } from '@src/languages/application/term/projection/termViewSaver';

@ProjectionHandler(CreateTermProjection)
export default class CreateTermProjectionHandler implements IProjectionHandler<CreateTermProjection> {
  constructor(
    @Inject(TERM_VIEW_SAVER) private readonly termViewSaver: TermViewSaver,
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(projection: CreateTermProjection): Promise<void> {
    try {
      await this.termViewSaver.save({
        id: projection.id,
        title: projection.title,
        description: projection.description,
        example: projection.example,
        type: projection.type,
        hashtags: projection.hashtags,
        totalLikes: 0,
        createdAt: projection.createdAt.toISOString(),
      });
    } catch (e) {
      void this.eventBus.publish([new TermCreatedUncompletedEvent(projection.id, projection.type)]);
      throw e;
    }
  }
}
