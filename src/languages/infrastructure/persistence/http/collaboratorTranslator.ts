import Collaborator from '@src/languages/domain/collaborator/collaborator';
import { AxiosResponse } from 'axios';

export class CollaboratorTranslator {
  static toCollaborator(collaboratorResponse: AxiosResponse): Collaborator {
    const collaborator = collaboratorResponse.data;
    return new Collaborator(collaborator.id, collaborator.name, collaborator.photo, collaborator.interests);
  }
}
