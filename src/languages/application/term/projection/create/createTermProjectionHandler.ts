import TermViewRepository, { TERM_REPOSITORY } from '@src/languages/application/term/projection/termViewRepository';
import CreateTermProjection from './createTermProjection';
import TermView from '@src/languages/application/term/projection/termView';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import TermType from '@src/languages/domain/term/termType';
import { EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import TermViewCreatedFailedEvent from '@src/languages/application/term/projection/termViewCreatedFailedEvent';
import { IProjectionHandler, ProjectionHandler } from '@src/shared/domain/bus/projectionBus/projectionHandler';

@ProjectionHandler(CreateTermProjection)
export default class CreateTermProjectionHandler implements IProjectionHandler<CreateTermProjection> {
  constructor(
    @Inject(TERM_REPOSITORY) private readonly termRepository: TermViewRepository,
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
