import DomainException from '../../../domain/exceptions/domainException';
import ApiErrorResponseException from '../apiErrorResponses/apiResponseException';

export default class ApiExceptionSerializer {
  public static serialize(error: ApiErrorResponseException|DomainException): Record<string, any> {
    return {
      status: error.status || 500,
      message: error.message,
      code: error.code,
    };
  }
}
