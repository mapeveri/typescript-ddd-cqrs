import { NextFunction, Request, Response } from 'express';

export interface Controller {
  run(req: Request, res: Response, next: NextFunction): Promise<any>;
}
