import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Controller } from '../../controller';
import FindUserQuery from '../../../../../../application/user/query/find/findUserQuery';
import UserJwtDecodedEmpty from '../../apiErrorResponses/userJwtDecodedEmpty';
import ApiExceptionSerializer from '../../../../../../../shared/infrastructure/api/serializers/apiExceptionSerializer';

export class MeGetController implements Controller {
  async run(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const token: string = req.headers['authorization'] ?? '';
      const user = jwt.decode(token) as JwtPayload;
      if (null === user) {
        const error = new UserJwtDecodedEmpty();
        res.status(error.status).json(ApiExceptionSerializer.serialize(error));
      }

      const query = req.container.get('Shared.QueryBus');
      const data = await query.ask(new FindUserQuery(user['id']));

      res.status(httpStatus.OK).send(data.content);
    } catch (e) {
      next(e);
    }
  }
}
