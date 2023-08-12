import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import ApiExceptionSerializer from '../../api/serializers/apiExceptionSerializer';
import DomainException from '@src/shared/domain/exceptions/domainException';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof DomainException) {
      response.status(exception.status).json(ApiExceptionSerializer.serialize(exception));
      return;
    }

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        status: exception.getStatus(),
        error: exception.message,
        code: exception.cause,
      });
      return;
    }

    response.status(500).json({
      status: 500,
      error: 'Internal Server Error',
      code: 'generic_error',
    });
  }
}
