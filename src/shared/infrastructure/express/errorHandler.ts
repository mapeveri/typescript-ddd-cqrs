import DomainException from '../../domain/exceptions/domainException';
import { Request, Response, NextFunction } from 'express';
import ApiExceptionSerializer from '../api/serializers/apiExceptionSerializer';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof DomainException) {
    res.status(err.status).json(ApiExceptionSerializer.serialize(err));
  }

  console.error(err.stack);
  res.status(500).json({ status: 500, error: 'Internal Server Error', code: 'generic_error' });
}

export default errorHandler;
