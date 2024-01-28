import DomainException from '@src/shared/domain/exceptions/domainException';

export default class ProjectionHandlerNotFoundError extends DomainException {
  constructor(
    public message: string = 'Projection handler not found',
    public code: string = 'project_handler_not_found',
  ) {
    super(message, code);
  }
}
