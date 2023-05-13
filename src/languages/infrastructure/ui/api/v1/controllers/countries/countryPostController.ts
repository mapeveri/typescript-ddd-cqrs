import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller';
import CreateCountryCommand from '../../../../../../application/country/command/create/createCountryCommand';
import InvalidParameters from '../../../../../../../shared/infrastructure/api/apiErrorResponses/InvalidParameters';
import ApiExceptionSerializer from '../../../../../../../shared/infrastructure/api/serializers/apiExceptionSerializer';

export class CountryPostController implements Controller {
  async run(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const body = req.body;
      if (!('name' in body) || !('iso' in body) || !('languages' in body) || !('id' in body)) {
        const error = new InvalidParameters();
        res.status(error.status).json(ApiExceptionSerializer.serialize(error));
      }

      const commandBus = req.container.get('Shared.CommandBus');
      await commandBus.dispatch(new CreateCountryCommand(body['id'], body['name'], body['iso'], body['languages']));
      res.status(httpStatus.CREATED).send({});
    } catch (e) {
      next(e);
    }
  }
}
