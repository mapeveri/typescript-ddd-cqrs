import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller';
import FindCountriesQuery from '../../../../../../application/country/query/findAll/findCountriesQuery';

export class CountriesGetController implements Controller {
  async run(req: Request, res: Response): Promise<any> {
    const query = req.container.get('Shared.QueryBus');
    const data = await query.ask(new FindCountriesQuery());

    res.status(httpStatus.OK).send(data.content);
  }
}
