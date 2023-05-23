import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller';
import FindCountryQuery from '../../../../../../application/country/query/find/findCountryQuery';
import { QueryBus } from '../../../../../../../shared/domain/buses/queryBus/queryBus';

export default class CountryGetController implements Controller {
  public constructor(private queryBus: QueryBus) {}
  
  async run(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const id = req.params.id;
      const data = await this.queryBus.ask(new FindCountryQuery(id));

      res.status(httpStatus.OK).send(data.content || {});
    } catch(e) {
      next(e);
    }
  }
}
