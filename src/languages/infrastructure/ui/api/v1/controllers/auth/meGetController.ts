import { Request } from 'express';
import FindUserQuery from '@src/languages/application/user/query/find/findUserQuery';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/buses/queryBus/queryBus';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { Controller, Get, HttpCode, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@src/shared/infrastructure/nestjs/guards/JwtAuthGuard';
import MeGetResponseDto from './meGetResponseDto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export default class MeGetController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Get('auth/me')
  @HttpCode(200)
  @ApiOkResponse({ type: MeGetResponseDto })
  @UseGuards(JwtAuthGuard)
  async run(@Req() request: Request): Promise<MeGetResponseDto> {
    const userId = request.user?.id;
    if (!userId) {
      throw new Error('Invalid user');
    }

    const data = await this.queryBus.ask(new FindUserQuery(userId));

    return data.content;
  }
}
