import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import ApiExceptionSerializer from '@src/shared/infrastructure/exceptions/serializers/apiExceptionSerializer';
import DomainException from '@src/shared/domain/exceptions/domainException';
import ConflictException from '@src/shared/domain/exceptions/conflictException';
import NotFoundException from '@src/shared/domain/exceptions/notFoundException';
import UnauthorizedException from '@src/shared/domain/exceptions/unauthorizedException';
import Logger, { LOGGER } from '@src/shared/domain/logger';
import { Inject } from '@src/shared/domain/injector/inject.decorator';

@Catch(Error)
export class NestErrorFilter implements ExceptionFilter {
  private mappedExceptions = [
    { exceptionType: ConflictException, status: HttpStatus.CONFLICT },
    { exceptionType: NotFoundException, status: HttpStatus.NOT_FOUND },
    { exceptionType: UnauthorizedException, status: HttpStatus.UNAUTHORIZED },
    { exceptionType: DomainException, status: HttpStatus.BAD_REQUEST },
  ];

  constructor(@Inject(LOGGER) private readonly logger: Logger) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(`${exception.stack}`);

    const matchedException = this.mappedExceptions.find((item) => exception instanceof item.exceptionType);
    if (matchedException) {
      const status = matchedException.status;
      response.status(status).json(ApiExceptionSerializer.serialize(exception as DomainException, status));
      return;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).json({ statusCode: status, message: exception.message });
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      code: 'generic_error',
    });
  }
}
