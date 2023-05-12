import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Controller } from '../../controller';
import FindUserQuery from '../../../../../../application/user/query/find/findUserQuery';

export class MeGetController implements Controller {
  async run(req: Request, res: Response, next: NextFunction): Promise<any> {

    try {
      const token: string = req.headers['authorization'] ?? '';
      const user = jwt.decode(token) as JwtPayload;
      if (null === user) {
        return res.status(httpStatus.OK).send({});
      }

      const query = req.container.get('Shared.QueryBus');
      const data = await query.ask(new FindUserQuery(user['id']));

      res.status(httpStatus.OK).send(data.content);
    } catch(e) {
      next(e);
    }
  }
}
