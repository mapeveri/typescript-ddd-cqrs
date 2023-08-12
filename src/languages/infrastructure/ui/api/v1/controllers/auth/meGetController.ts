import { Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import FindUserQuery from '@src/languages/application/user/query/find/findUserQuery';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/buses/queryBus/queryBus';
import UserJwtDecodedEmpty from '../../apiErrorResponses/userJwtDecodedEmpty';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { Controller, Get, Req } from '@nestjs/common';

@Controller()
export default class MeGetController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Get('auth/me')
  async run(@Req() request: Request): Promise<any> {
    const token: string = request.headers['authorization'] ?? '';
    const user = jwt.decode(token) as JwtPayload;
    if (null === user) {
      throw new UserJwtDecodedEmpty();
    }

    const data = await this.queryBus.ask(new FindUserQuery(user['id']));

    return data.content;
  }
}
