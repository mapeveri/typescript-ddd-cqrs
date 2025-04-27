import CollaboratorRepository from '@src/language/domain/collaborator/collaboratorRepository';
import Collaborator from '@src/language/domain/collaborator/collaborator';
import CollaboratorId from '@src/language/domain/collaborator/collaboratorId';
import { Injectable } from '@nestjs/common';
import { HttpCollaboratorAdapter } from '@src/language/infrastructure/persistence/http/httpCollaboratorAdapter';

@Injectable()
export class TranslatingCollaboratorRepository implements CollaboratorRepository {
  constructor(private readonly httpCollaboratorAdapter: HttpCollaboratorAdapter) {}

  async findById(id: CollaboratorId): Promise<Collaborator | null> {
    return this.httpCollaboratorAdapter.toCollaborator(id);
  }
}
