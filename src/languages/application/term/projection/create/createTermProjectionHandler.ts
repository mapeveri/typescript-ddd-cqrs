import TermViewReadLayer, { TERM_VIEW_READ_LAYER } from '@src/languages/application/term/query/termViewReadLayer';
import CreateTermProjection from './createTermProjection';
import TermView from '@src/languages/application/term/query/termView';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import TermType from '@src/languages/domain/term/termType';
import { EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import TermViewCreatedFailedEvent from '@src/languages/application/term/query/termViewCreatedFailedEvent';
import { IProjectionHandler, ProjectionHandler } from '@src/shared/domain/bus/projectionBus/projectionHandler';

@ProjectionHandler(CreateTermProjection)
export default class CreateTermProjectionHandler implements IProjectionHandler<CreateTermProjection> {
  constructor(
    @Inject(TERM_VIEW_READ_LAYER) private readonly termRepository: TermViewReadLayer,
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(projection: CreateTermProjection): Promise<void> {
    const term = this.getTerm(projection);
    try {
      await this.termRepository.save(term);
    } catch (e) {
      void this.eventBus.publish([new TermViewCreatedFailedEvent(term.id, term.type.value)]);
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
