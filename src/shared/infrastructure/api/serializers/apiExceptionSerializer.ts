import DomainException from '@src/shared/domain/exceptions/domainException';

export default class ApiExceptionSerializer {
  public static serialize(error: DomainException): Record<string, any> {
    return {
      statusCode: error.status || 500,
      message: error.message,
      code: error.code,
    };
  }
}
