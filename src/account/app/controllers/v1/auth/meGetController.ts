import { Request } from 'express';
import { Controller, Get, HttpCode, Inject, Req, UseGuards } from '@nestjs/common';
import { NestJwtAuthGuard } from '@src/shared/infrastructure/auth/guards/nestJwtAuthGuard';
import MeGetResponseDto from './meGetResponseDto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/bus/queryBus/queryBus';
import FindUserQuery from '@src/account/application/user/query/findUserQuery';

@ApiTags('Auth')
@Controller()
export default class MeGetController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Get('auth/me')
  @HttpCode(200)
  @ApiOkResponse({ type: MeGetResponseDto })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(NestJwtAuthGuard)
  async run(@Req() req: Request): Promise<MeGetResponseDto> {
    const userId = req.user['id'];
    const data = await this.queryBus.ask(new FindUserQuery(userId));

    return data.content;
  }
}
