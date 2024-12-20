import Collaborator from '@src/languages/domain/collaborator/collaborator';
import { AxiosResponse } from 'axios';
import CollaboratorId from '@src/languages/domain/collaborator/collaboratorId';

export class CollaboratorTranslator {
  static toCollaborator(data: AxiosResponse): Collaborator {
    const collaborator = data as unknown as { id: string; name: string; photo: string; interests: string[] };
    return new Collaborator(
      CollaboratorId.fromPrimitives(collaborator.id),
      collaborator.name,
      collaborator.photo,
      collaborator.interests,
    );
  }
}
