import TermRepository, { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import CreateTermProjection from './createTermProjection';
import Term from '@src/languages/domain/term/term';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import TermType from '@src/languages/domain/term/valueObjects/termType';
import { EVENT_BUS, EventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import TermCreatedFailedEvent from '@src/languages/domain/term/domainEvents/TermCreatedFailedEvent';
import { IProjectionHandler, ProjectionHandler } from '@src/shared/domain/buses/projectionBus/projectionHandler';

@ProjectionHandler(CreateTermProjection)
export default class CreateTermProjectionHandler implements IProjectionHandler<CreateTermProjection> {
  constructor(
    @Inject(TERM_REPOSITORY) private readonly termRepository: TermRepository,
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(projection: CreateTermProjection): Promise<void> {
    const term = this.getTerm(projection);
    try {
      await this.termRepository.save(term);
    } catch (e) {
      void this.eventBus.publish([new TermCreatedFailedEvent(term.id, term.type.value)]);
      throw e;
    }
  }

  private getTerm(command: CreateTermProjection): Term {
    return Term.create(
      command.id,
      command.title,
      command.description,
      command.example,
      TermType.of(command.type),
      command.hashtags,
      0,
    );
  }
}
