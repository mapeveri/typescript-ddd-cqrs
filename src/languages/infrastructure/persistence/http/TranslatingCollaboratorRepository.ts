import CollaboratorRepository from '@src/languages/domain/collaborator/collaboratorRepository';
import Collaborator from '@src/languages/domain/collaborator/collaborator';
import CollaboratorId from '@src/languages/domain/collaborator/collaboratorId';
import { Injectable } from '@nestjs/common';
import { HttpCollaboratorAdapter } from '@src/languages/infrastructure/persistence/http/httpCollaboratorAdapter';

@Injectable()
export class TranslatingCollaboratorRepository implements CollaboratorRepository {
  constructor(private readonly httpCollaboratorAdapter: HttpCollaboratorAdapter) {}

  async findById(id: CollaboratorId): Promise<Collaborator | null> {
    return this.httpCollaboratorAdapter.toCollaborator(id);
  }
}
