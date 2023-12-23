import { Body, Controller, HttpCode, HttpStatus, Inject, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@src/shared/infrastructure/nestjs/guards/JwtAuthGuard';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import UserPutDto from '@src/languages/infrastructure/ui/api/v1/controllers/user/userPutDto';
import { Request } from 'express';
import UpdateUserCommand from '@src/languages/application/user/command/update/updateUserCommand';

@ApiTags('User')
@Controller()
export default class UserPutController {
  public constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus) {}

  @Put('user')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'The record has been successfully updated.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(JwtAuthGuard)
  async run(@Req() req: Request, @Body() payload: UserPutDto): Promise<any> {
    const userId = req.user['id'];
    await this.commandBus.dispatch(new UpdateUserCommand(userId, payload.name, payload.photo, payload.interests));
  }
}
