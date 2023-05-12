import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller';
import FindCountryQuery from '../../../../../../application/country/query/find/findCountryQuery';

export class CountryGetController implements Controller {
  async run(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const id = req.params.id;
      const query = req.container.get('Shared.QueryBus');
      const data = await query.ask(new FindCountryQuery(id));

      res.status(httpStatus.OK).send(data.content);
    } catch(e) {
      next(e);
    }
  }
}
