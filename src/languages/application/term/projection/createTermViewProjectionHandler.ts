import CreateTermViewProjection from './createTermViewProjection';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import TermCreatedUncompletedEvent from '@src/languages/domain/term/termCreatedUncompletedEvent';
import { IProjectionHandler, ProjectionHandler } from '@src/shared/domain/bus/projectionBus/projectionHandler';
import TermViewSaver, { TERM_VIEW_SAVER } from '@src/languages/application/term/projection/termViewSaver';

@ProjectionHandler(CreateTermViewProjection)
export default class CreateTermViewProjectionHandler implements IProjectionHandler<CreateTermViewProjection> {
  constructor(
    @Inject(TERM_VIEW_SAVER) private readonly termViewSaver: TermViewSaver,
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(projection: CreateTermViewProjection): Promise<void> {
    try {
      await this.termViewSaver.save({
        id: projection.id,
        title: projection.title,
        description: projection.description,
        example: projection.example,
        type: projection.type,
        hashtags: projection.hashtags,
        totalLikes: 0,
        likes: [],
        createdAt: projection.createdAt.toISOString(),
      });
    } catch (e) {
      void this.eventBus.publish([new TermCreatedUncompletedEvent(projection.id, projection.type)]);
      throw e;
    }
  }
}