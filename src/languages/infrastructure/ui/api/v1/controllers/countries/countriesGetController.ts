import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller';
import FindCountriesQuery from '@src/languages/application/country/query/findAll/findCountriesQuery';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/buses/queryBus/queryBus';
import { Inject } from '@nestjs/common';

export default class CountriesGetController implements Controller {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const data = await this.queryBus.ask(new FindCountriesQuery());

      res.status(httpStatus.OK).send(data.content);
    } catch (e) {
      next(e);
    }
  }
}
