import CollaboratorRepository from '@src/languages/domain/collaborator/collaboratorRepository';
import Collaborator from '@src/languages/domain/collaborator/collaborator';
import CollaboratorId from '@src/languages/domain/collaborator/collaboratorId';

export class CollaboratorRepositoryMock implements CollaboratorRepository {
  private collaborators: Collaborator[];

  constructor() {
    this.collaborators = [];
  }

  add(collaborator: Collaborator): void {
    this.collaborators.push(collaborator);
  }

  clean(): void {
    this.collaborators = [];
  }

  async findById(_id: CollaboratorId): Promise<Collaborator | null> {
    const collaborator = this.collaborators.length > 0 ? this.collaborators[0] : null;

    return Promise.resolve(collaborator);
  }
}
