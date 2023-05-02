import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller';
import BodyError from '../../../../../../../shared/domain/exceptions/bodyError';
import CreateCountryCommand from '../../../../../../application/country/command/create/createCountryCommand';

export class CountryPostController implements Controller {
  async run(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body;
      if (!('name' in body) || !('iso' in body) || !('languages' in body) || !('id' in body)) {
        throw new BodyError('Invalid parameters');
      }

      const commandBus = req.container.get('Shared.CommandBus');
      await commandBus.dispatch(new CreateCountryCommand(body['id'], body['name'], body['iso'], body['languages']));
      res.status(httpStatus.CREATED).send({});
    } catch (e) {
      res.status(httpStatus.BAD_REQUEST).send(e);
    }
  }
}
