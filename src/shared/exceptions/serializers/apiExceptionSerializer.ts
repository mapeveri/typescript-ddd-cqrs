import DomainException from '@src/shared/domain/exceptions/domainException';

export default class ApiExceptionSerializer {
  public static serialize(error: DomainException, status: number): Record<string, any> {
    return {
      statusCode: status,
      message: error.message,
      code: error.code,
    };
  }
}
