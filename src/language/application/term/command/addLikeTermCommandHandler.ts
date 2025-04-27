import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import AddLikeTermCommand from '@src/language/application/term/command/addLikeTermCommand';
import TermId from '@src/language/domain/term/termId';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import TermRepository, { TERM_REPOSITORY } from '@src/language/domain/term/termRepository';
import Term from '@src/language/domain/term/term';
import TermDoesNotExistsException from '@src/language/domain/term/termDoesNotExistsException';
import { ASYNC_EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import CollaboratorRepository, {
  COLLABORATOR_REPOSITORY,
} from '@src/language/domain/collaborator/collaboratorRepository';
import CollaboratorId from '@src/language/domain/collaborator/collaboratorId';
import Collaborator from '@src/language/domain/collaborator/collaborator';
import CollaboratorDoesNotExistsException from '@src/language/domain/collaborator/collaboratorDoesNotExistsException';
import { IDENTITY_PROVIDER, IdentityProvider } from '@src/shared/domain/services/identityProvider';

@CommandHandler(AddLikeTermCommand)
export default class AddLikeTermCommandHandler implements ICommandHandler<AddLikeTermCommand> {
  constructor(
    @Inject(TERM_REPOSITORY) private readonly termRepository: TermRepository,
    @Inject(COLLABORATOR_REPOSITORY) private readonly collaboratorRepository: CollaboratorRepository,
    @Inject(IDENTITY_PROVIDER) private readonly identityProvider: IdentityProvider,
    @Inject(ASYNC_EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(command: AddLikeTermCommand): Promise<void> {
    const term = await this.getTerm(command.termId);
    const collaborator = await this.getCollaborator(command.userId);

    const userId = command.userId;
    const id = this.identityProvider.generateFromValue(`${term.getId().toString()}${userId}`);

    term.addLike(id, userId, collaborator.getName(), collaborator.getPhoto());

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
