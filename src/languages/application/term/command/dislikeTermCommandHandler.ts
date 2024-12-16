import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import TermId from '@src/languages/domain/term/termId';
import DislikeTermCommand from '@src/languages/application/term/command/dislikeTermCommand';
import Term from '@src/languages/domain/term/term';
import TermDoesNotExistsException from '@src/languages/domain/term/termDoesNotExistsException';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import TermRepository, { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import { ASYNC_EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import CollaboratorRepository, {
  COLLABORATOR_REPOSITORY,
} from '@src/languages/domain/collaborator/collaboratorRepository';
import Collaborator from '@src/languages/domain/collaborator/collaborator';
import CollaboratorId from '@src/languages/domain/collaborator/collaboratorId';
import CollaboratorDoesNotExistsException from '@src/languages/domain/collaborator/collaboratorDoesNotExistsException';

@CommandHandler(DislikeTermCommand)
export default class DislikeTermCommandHandler implements ICommandHandler<DislikeTermCommand> {
  constructor(
    @Inject(TERM_REPOSITORY) private readonly termRepository: TermRepository,
    @Inject(COLLABORATOR_REPOSITORY) private readonly collaboratorRepository: CollaboratorRepository,
    @Inject(ASYNC_EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(command: DislikeTermCommand): Promise<void> {
    const termId = TermId.of(command.termId);
    const collaboratorId = CollaboratorId.of(command.userId);

    const term = await this.getTerm(termId);
    const collaborator = await this.getCollaborator(collaboratorId);

    term.dislike(collaboratorId, collaborator.getName(), collaborator.getPhoto());

    this.termRepository.save(term);

    void this.eventBus.publish(term.pullDomainEvents());
  }

  private async getTerm(termId: TermId): Promise<Term> {
    const term = await this.termRepository.findById(termId);
    if (!term) {
      throw new TermDoesNotExistsException(termId.toString());
    }

    return term;
  }

  private async getCollaborator(collaboratorId: CollaboratorId): Promise<Collaborator> {
    const collaborator = await this.collaboratorRepository.findById(collaboratorId);
    if (!collaborator) {
      throw new CollaboratorDoesNotExistsException(collaboratorId.toString());
    }

    return collaborator;
  }
}
