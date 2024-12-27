import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import CollaboratorId from '@src/languages/domain/collaborator/collaboratorId';
import Collaborator from '@src/languages/domain/collaborator/collaborator';
import { CollaboratorTranslator } from '@src/languages/infrastructure/persistence/http/collaboratorTranslator';
import NestJwtTokenGenerator from '@src/shared/infrastructure/auth/jwt/nestJwtTokenGenerator';

@Injectable()
export class HttpCollaboratorAdapter {
  private URL = '/api/v1/users/{id}';

  constructor(
    private readonly httpService: HttpService,
    private readonly nestJwtTokenGenerator: NestJwtTokenGenerator,
  ) {}

  async toCollaborator(id: CollaboratorId): Promise<Collaborator | null> {
    const m2mToken = this.nestJwtTokenGenerator.m2m();

    const { data } = await firstValueFrom(
      this.httpService.get(this.URL.replace('{id}', id.toString()), {
        headers: {
          Authorization: `Bearer ${m2mToken.token}`,
        },
      }),
    );

    if (!data) return null;

    return CollaboratorTranslator.toCollaborator(data);
  }
}
