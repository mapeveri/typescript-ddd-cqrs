import { Request } from 'express';
import FindUserQuery from '@src/languages/application/user/query/find/findUserQuery';
import { Controller, Get, HttpCode, Inject, Req, UseGuards } from '@nestjs/common';
import { NestJwtAuthGuard } from '@src/shared/infrastructure/api/guards/nestJwtAuthGuard';
import MeGetResponseDto from './meGetResponseDto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/buses/queryBus/queryBus';

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
