import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller';
import BodyError from '../../../../../../../shared/domain/exceptions/bodyError';
import CreateWordCommand from '../../../../../../../languages/application/word/command/create/createWordCommand';

export class WordPostController implements Controller {
  async run(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const body = req.body;
      if (
        !('id' in body) ||
        !('language_id' in body) ||
        !('country_id' in body) ||
        !('user_id' in body) ||
        !('terms' in body)
      ) {
        throw new BodyError('Invalid parameters');
      }

      const commandBus = req.container.get('Shared.CommandBus');
      await commandBus.dispatch(
        new CreateWordCommand(body['id'], body['language_id'], body['country_id'], body['user_id'], body['terms'])
      );
      res.status(httpStatus.CREATED).send({});
    } catch (e) {
      next(e);
    }
  }
}
