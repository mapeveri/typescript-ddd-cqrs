import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller';
import CreateCountryCommand from '@src/languages/application/country/command/create/createCountryCommand';
import InvalidParameters from '@src/shared/infrastructure/api/apiErrorResponses/InvalidParameters';
import ApiExceptionSerializer from '@src/shared/infrastructure/api/serializers/apiExceptionSerializer';
import { CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';

export default class CountryPostController implements Controller {
  public constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const body = req.body;
      if (!('name' in body) || !('iso' in body) || !('languages' in body) || !('id' in body)) {
        const error = new InvalidParameters();
        res.status(error.status).json(ApiExceptionSerializer.serialize(error));
      }

      await this.commandBus.dispatch(new CreateCountryCommand(body['id'], body['name'], body['iso'], body['languages']));
      res.status(httpStatus.CREATED).send({});
    } catch (e) {
      next(e);
    }
  }
}
