import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import CollaboratorId from '@src/languages/domain/collaborator/collaboratorId';
import Collaborator from '@src/languages/domain/collaborator/collaborator';
import { CollaboratorTranslator } from '@src/languages/infrastructure/persistence/http/collaboratorTranslator';
import NestJwtM2mTokenGenerator from '@src/shared/infrastructure/auth/jwt/nestJwtM2mTokenGenerator';

@Injectable()
export class HttpCollaboratorAdapter {
  private URL = '/api/v1/users/{id}';

  constructor(
    private readonly httpService: HttpService,
    private readonly nestJwtM2mTokenGenerator: NestJwtM2mTokenGenerator,
  ) {}

  async toCollaborator(id: CollaboratorId): Promise<Collaborator | null> {
    const m2mToken = this.nestJwtM2mTokenGenerator.generate();

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
