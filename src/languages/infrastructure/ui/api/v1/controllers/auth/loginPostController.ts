import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { v5 as uuidv5 } from 'uuid';
import { Controller } from '../../controller';
import BodyError from '../../../../../../../shared/domain/exceptions/bodyError';
import LoginUserCommand from '../../../../../../application/auth/command/loginUser/loginUserCommand';

export class LoginPostController implements Controller {
  async run(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body;
      if (!('name' in body) || !('email' in body) || !('token' in body) || !('provider' in body)) {
        throw new BodyError('Invalid parameters');
      }

      const id = uuidv5(body['email'], uuidv5.DNS);
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
      console.error(e);

      res.status(httpStatus.UNAUTHORIZED).send({ message: 'Error during login', status: 'error' });
    }
  }
}
