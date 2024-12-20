import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import CollaboratorId from '@src/languages/domain/collaborator/collaboratorId';
import Collaborator from '@src/languages/domain/collaborator/collaborator';
import { CollaboratorTranslator } from '@src/languages/infrastructure/persistence/http/collaboratorTranslator';

@Injectable()
export class HttpCollaboratorAdapter {
  URL = '/api/v1/users/{id}';
  constructor(private readonly httpService: HttpService) {}

  async toCollaborator(id: CollaboratorId): Promise<Collaborator | null> {
    const { data } = await firstValueFrom(this.httpService.get(this.URL.replace('{id}', id.toString())));
    if (!data) return null;

    return CollaboratorTranslator.toCollaborator(data);
  }
}
