import Collaborator from '@src/language/domain/collaborator/collaborator';
import CollaboratorId from '@src/language/domain/collaborator/collaboratorId';

interface CollaboratorRepository {
  findById(id: CollaboratorId): Promise<Collaborator | null>;
}

export default CollaboratorRepository;

export const COLLABORATOR_REPOSITORY = Symbol('CollaboratorRepository');
