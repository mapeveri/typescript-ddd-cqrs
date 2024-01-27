import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import ApiExceptionSerializer from '@src/shared/infrastructure/api/serializers/apiExceptionSerializer';
import DomainException from '@src/shared/domain/exceptions/domainException';
import ConflictException from '@src/shared/domain/exceptions/conflictException';
import NotFoundException from '@src/shared/domain/exceptions/notFoundException';
import UnauthorizedException from '@src/shared/domain/exceptions/unauthorizedException';
import LoggerInterface, { LOGGER_INTERFACE } from '@src/shared/domain/loggerInterface';
import { Inject } from '@src/shared/domain/injector/inject.decorator';

@Catch(Error)
export class NestErrorFilter implements ExceptionFilter {
  constructor(@Inject(LOGGER_INTERFACE) private readonly logger: LoggerInterface) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(`Exception: ${exception}`);

    if (exception instanceof ConflictException) {
      response.status(HttpStatus.CONFLICT).json(ApiExceptionSerializer.serialize(exception, HttpStatus.CONFLICT));
      return;
    }

    if (exception instanceof NotFoundException) {
      response.status(HttpStatus.NOT_FOUND).json(ApiExceptionSerializer.serialize(exception, HttpStatus.NOT_FOUND));
      return;
    }

    if (exception instanceof UnauthorizedException) {
      response
        .status(HttpStatus.UNAUTHORIZED)
        .json(ApiExceptionSerializer.serialize(exception, HttpStatus.UNAUTHORIZED));
      return;
    }

    if (exception instanceof DomainException) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(ApiExceptionSerializer.serialize(exception, HttpStatus.INTERNAL_SERVER_ERROR));
      return;
    }

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json(exception.getResponse());
      return;
    }

    response.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      code: 'generic_error',
    });
  }
}
