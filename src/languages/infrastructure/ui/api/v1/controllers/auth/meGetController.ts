import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Controller } from '../../controller';
import FindUserQuery from '../../../../../../application/user/query/find/findUserQuery';
import UserJwtDecodedEmpty from '../../apiErrorResponses/userJwtDecodedEmpty';
import ApiExceptionSerializer from '../../../../../../../shared/infrastructure/api/serializers/apiExceptionSerializer';
import { QueryBus } from '../../../../../../../shared/domain/buses/queryBus/queryBus';

export default class MeGetController implements Controller {
  public constructor(private queryBus: QueryBus) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const token: string = req.headers['authorization'] ?? '';
      const user = jwt.decode(token) as JwtPayload;
      if (null === user) {
        const error = new UserJwtDecodedEmpty();
        res.status(error.status).json(ApiExceptionSerializer.serialize(error));
      }

      const data = await this.queryBus.ask(new FindUserQuery(user['id']));

      res.status(httpStatus.OK).send(data.content);
    } catch (e) {
      next(e);
    }
  }
}
