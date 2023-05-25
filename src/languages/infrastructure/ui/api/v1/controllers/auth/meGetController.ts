import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import FindUserQuery from '@src/languages/application/user/query/find/findUserQuery';
import ApiExceptionSerializer from '@src/shared/infrastructure/api/serializers/apiExceptionSerializer';
import { QueryBus } from '@src/shared/domain/buses/queryBus/queryBus';
import { Controller } from '../../controller';
import UserJwtDecodedEmpty from '../../apiErrorResponses/userJwtDecodedEmpty';

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
