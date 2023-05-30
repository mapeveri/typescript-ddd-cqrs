import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller';
import { QueryBus } from '@src/shared/domain/buses/queryBus/queryBus';
import SearchTermQuery from '@src/languages/application/term/query/search/searchTermQuery';

export default class SearchTermsGetController implements Controller {
  public constructor(private queryBus: QueryBus) {}

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
