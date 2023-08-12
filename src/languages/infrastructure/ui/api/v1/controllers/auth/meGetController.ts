import { Request } from 'express';
import FindUserQuery from '@src/languages/application/user/query/find/findUserQuery';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/buses/queryBus/queryBus';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@src/shared/infrastructure/nestjs/guards/JwtAuthGuard';

@Controller()
export default class MeGetController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Get('auth/me')
  @UseGuards(JwtAuthGuard)
  async run(@Req() request: Request): Promise<any> {
    const userId = request.user?.id;
    if (!userId) {
      throw new Error('Invalid user');
    }

    const data = await this.queryBus.ask(new FindUserQuery(userId));

    return data.content;
  }
}
