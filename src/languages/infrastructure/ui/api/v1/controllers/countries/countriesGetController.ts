import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller';
import FindCountriesQuery from '../../../../../../application/country/query/findAll/findCountriesQuery';

export class CountriesGetController implements Controller {
  async run(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const query = req.container.get('Shared.QueryBus');
      const data = await query.ask(new FindCountriesQuery());

      res.status(httpStatus.OK).send(data.content);
    } catch(e) {
      next(e);
    }
  }
}
