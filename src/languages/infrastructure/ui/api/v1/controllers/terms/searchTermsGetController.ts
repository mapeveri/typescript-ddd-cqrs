import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/buses/queryBus/queryBus';
import SearchTermQuery from '@src/languages/application/term/query/search/searchTermQuery';
import { Inject } from '@src/shared/domain/injector/inject.decorator';

export default class SearchTermsGetController implements Controller {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const term = req.params.term;
      const data = await this.queryBus.ask(new SearchTermQuery(term));

      res.status(httpStatus.OK).send(data.content);
    } catch (e) {
      next(e);
    }
  }
}
