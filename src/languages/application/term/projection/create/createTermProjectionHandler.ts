import CreateTermProjection from './createTermProjection';
import TermView from '@src/languages/application/term/viewModel/termView';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import TermType from '@src/languages/domain/term/termType';
import { EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import TermCreatedUncompletedEvent from '@src/languages/domain/term/termCreatedUncompletedEvent';
import { IProjectionHandler, ProjectionHandler } from '@src/shared/domain/bus/projectionBus/projectionHandler';
import TermViewSaver, { TERM_VIEW_SAVER } from '@src/languages/application/term/projection/create/termViewSaver';

@ProjectionHandler(CreateTermProjection)
export default class CreateTermProjectionHandler implements IProjectionHandler<CreateTermProjection> {
  constructor(
    @Inject(TERM_VIEW_SAVER) private readonly termViewSaver: TermViewSaver,
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(projection: CreateTermProjection): Promise<void> {
    const term = this.getTerm(projection);
    try {
      await this.termViewSaver.save(term);
    } catch (e) {
      void this.eventBus.publish([new TermCreatedUncompletedEvent(term.id, term.type.value)]);
      throw e;
    }
  }

  private getTerm(command: CreateTermProjection): TermView {
    return TermView.create(
      command.id,
      command.title,
      command.description,
      command.example,
      TermType.of(command.type),
      command.hashtags,
      0,
      command.createdAt,
    );
  }
}
