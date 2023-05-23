import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller';
import CreateWordCommand from '../../../../../../../languages/application/word/command/create/createWordCommand';
import InvalidParameters from '../../../../../../../shared/infrastructure/api/apiErrorResponses/InvalidParameters';
import ApiExceptionSerializer from '../../../../../../../shared/infrastructure/api/serializers/apiExceptionSerializer';
import { CommandBus } from '../../../../../../../shared/domain/buses/commandBus/commandBus';

export default class WordPostController implements Controller {
  public constructor(private commandBus: CommandBus) {}

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
        const error = new InvalidParameters();
        res.status(error.status).json(ApiExceptionSerializer.serialize(error));
      }

      await this.commandBus.dispatch(
        new CreateWordCommand(body['id'], body['language_id'], body['country_id'], body['user_id'], body['terms'])
      );
      res.status(httpStatus.CREATED).send({});
    } catch (e) {
      next(e);
    }
  }
}
