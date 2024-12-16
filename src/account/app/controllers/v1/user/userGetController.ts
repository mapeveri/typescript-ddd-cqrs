import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Controller, Get, HttpCode, Inject, Param, UseGuards } from '@nestjs/common';
import { NestJwtAuthGuard } from '@src/shared/guards/nestJwtAuthGuard';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/bus/queryBus/queryBus';
import FindUserQuery from '@src/account/application/user/query/findUserQuery';
import UserGetResponse from '@src/account/app/controllers/v1/user/userGetResponse';

@ApiTags('Users')
@Controller()
export default class UserGetController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Get('users/:id')
  @HttpCode(200)
  @ApiOkResponse({ type: UserGetResponse })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(NestJwtAuthGuard)
  async run(@Param('id') id: string): Promise<UserGetResponse> {
    const user = await this.queryBus.ask(new FindUserQuery(id));

    return user.content;
  }
}
