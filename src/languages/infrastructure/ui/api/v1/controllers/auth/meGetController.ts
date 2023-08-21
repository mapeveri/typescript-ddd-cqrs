import { Request } from 'express';
import FindUserQuery from '@src/languages/application/user/query/find/findUserQuery';
import { Controller, Get, HttpCode, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@src/shared/infrastructure/nestjs/guards/JwtAuthGuard';
import MeGetResponseDto from './meGetResponseDto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';

@ApiTags('Auth')
@Controller()
export default class MeGetController {
  public constructor(private queryBus: QueryBus) {}

  @Get('auth/me')
  @HttpCode(200)
  @ApiOkResponse({ type: MeGetResponseDto })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(JwtAuthGuard)
  async run(@Req() request: Request): Promise<MeGetResponseDto> {
    const userId = request.user?.id;
    if (!userId) {
      throw new Error('Invalid user');
    }

    const data = await this.queryBus.execute(new FindUserQuery(userId));

    return data.content;
  }
}
