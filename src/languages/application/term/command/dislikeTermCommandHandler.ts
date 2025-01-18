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
import { IDENTITY_PROVIDER, IdentityProvider } from '@src/shared/domain/services/IdentityProvider';

@CommandHandler(DislikeTermCommand)
export default class DislikeTermCommandHandler implements ICommandHandler<DislikeTermCommand> {
  constructor(
    @Inject(TERM_REPOSITORY) private readonly termRepository: TermRepository,
    @Inject(COLLABORATOR_REPOSITORY) private readonly collaboratorRepository: CollaboratorRepository,
    @Inject(IDENTITY_PROVIDER) private readonly identityProvider: IdentityProvider,
    @Inject(ASYNC_EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(command: DislikeTermCommand): Promise<void> {
    const term = await this.getTerm(command.termId);
    const collaborator = await this.getCollaborator(command.userId);

    const userId = command.userId;
    const id = this.identityProvider.generateFromValue(`${term.getId().toString()}${userId}`);

    term.dislike(id, userId, collaborator.getName(), collaborator.getPhoto());

    this.termRepository.save(term);

    void this.eventBus.publish(term.pullDomainEvents());
  }

  private async getTerm(termId: string): Promise<Term> {
    const term = await this.termRepository.findById(TermId.of(termId));
    if (!term) {
      throw new TermDoesNotExistsException(termId.toString());
    }

    return term;
  }

  private async getCollaborator(collaboratorId: string): Promise<Collaborator> {
    const collaborator = await this.collaboratorRepository.findById(CollaboratorId.of(collaboratorId));
    if (!collaborator) {
      throw new CollaboratorDoesNotExistsException(collaboratorId.toString());
    }

    return collaborator;
  }
}
