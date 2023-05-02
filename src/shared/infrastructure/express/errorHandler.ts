import { Request, Response, NextFunction } from 'express';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err.stack);
  res.status(500).send('Internal Server Error');
}

export default errorHandler;
