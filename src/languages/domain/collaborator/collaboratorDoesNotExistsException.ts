import NotFoundException from '@src/shared/domain/exceptions/notFoundException';

export default class CollaboratorDoesNotExistsException extends NotFoundException {
  constructor(collaboratorId: string) {
    super(`Collaborator ${collaboratorId} does not exists`, 'collaborator_does_not_exists');
  }
}
