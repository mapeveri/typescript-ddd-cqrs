import Collaborator from '@src/languages/domain/collaborator/collaborator';
import CollaboratorId from '@src/languages/domain/collaborator/collaboratorId';

interface CollaboratorRepository {
  findById(id: CollaboratorId): Promise<Collaborator | null>;
}

export default CollaboratorRepository;

export const COLLABORATOR_REPOSITORY = Symbol('CollaboratorRepository');
