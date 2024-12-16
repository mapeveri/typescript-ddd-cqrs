import { Body, Controller, HttpCode, HttpStatus, Inject, Put, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import { NestJwtAuthGuard } from '@src/shared/guards/nestJwtAuthGuard';
import UserPutDto from '@src/account/app/controllers/v1/user/userPutDto';
import UpdateUserCommand from '@src/account/application/user/command/updateUserCommand';

@ApiTags('Users')
@Controller()
export default class UserPutController {
  constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus) {}

  @Put('user')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'The record has been successfully updated.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(NestJwtAuthGuard)
  async run(@Req() req: Request, @Body() payload: UserPutDto): Promise<void> {
    const userId = req.user['id'];
    await this.commandBus.dispatch(new UpdateUserCommand(userId, payload.name, payload.photo, payload.interests));
  }
}
