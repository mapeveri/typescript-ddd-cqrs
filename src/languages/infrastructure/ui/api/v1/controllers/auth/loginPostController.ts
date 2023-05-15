import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { Controller } from '../../controller';
import LoginUserCommand from '../../../../../../application/auth/command/loginUser/loginUserCommand';
import InvalidParameters from '../../../../../../../shared/infrastructure/api/apiErrorResponses/InvalidParameters';
import ApiExceptionSerializer from '../../../../../../../shared/infrastructure/api/serializers/apiExceptionSerializer';
import { Uuid } from '../../../../../../../shared/domain/valueObjects/uuid';

export class LoginPostController implements Controller {
  async run(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const body = req.body;
      if (!('name' in body) || !('email' in body) || !('token' in body) || !('provider' in body)) {
        const error = new InvalidParameters();
        res.status(error.status).json(ApiExceptionSerializer.serialize(error));
      }

      const id = Uuid.generateFromString(body['email']).toString();
      const commandBus = req.container.get('Shared.CommandBus');

      await commandBus.dispatch(
        new LoginUserCommand(id, body['name'], body['email'], body['token'], body['provider'], body['photo'])
      );

      const user = { id: id, name: body['name'], email: body['email'] };
      const token: string = jwt.sign(user, process.env.JWT_SECRET || '');
      res.status(httpStatus.OK).send({
        user,
        token,
      });
    } catch (e) {
      next(e);
    }
  }
}
