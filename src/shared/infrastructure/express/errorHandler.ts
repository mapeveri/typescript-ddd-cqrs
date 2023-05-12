import DomainException from '../../domain/exceptions/domainException';
import { Request, Response, NextFunction } from 'express';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof DomainException) {
    res.status(err.status).json({ error: err.message });
  }
  
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
}

export default errorHandler;
