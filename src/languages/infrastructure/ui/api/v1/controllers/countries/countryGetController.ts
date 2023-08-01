import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller';
import FindCountryQuery from '@src/languages/application/country/query/find/findCountryQuery';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/buses/queryBus/queryBus';
import { Inject } from '@src/shared/domain/injector/inject.decorator';

export default class CountryGetController implements Controller {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const id = req.params.id;
      const data = await this.queryBus.ask(new FindCountryQuery(id));

      res.status(httpStatus.OK).send(data.content || {});
    } catch (e) {
      next(e);
    }
  }
}
