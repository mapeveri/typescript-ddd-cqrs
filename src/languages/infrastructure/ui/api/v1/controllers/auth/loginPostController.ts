import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import LoginUserCommand from '@src/languages/application/auth/command/loginUser/loginUserCommand';
import InvalidParameters from '@src/shared/infrastructure/api/apiErrorResponses/InvalidParameters';
import ApiExceptionSerializer from '@src/shared/infrastructure/api/serializers/apiExceptionSerializer';
import { Uuid } from '@src/shared/domain/valueObjects/uuid';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import { Controller } from '../../controller';
import { Inject } from '@nestjs/common';

export default class LoginPostController implements Controller {
  public constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const body = req.body;
      if (!('name' in body) || !('email' in body) || !('token' in body) || !('provider' in body)) {
        const error = new InvalidParameters();
        res.status(error.status).json(ApiExceptionSerializer.serialize(error));
      }

      const id = Uuid.fromString(body['email']).toString();
      await this.commandBus.dispatch(
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
