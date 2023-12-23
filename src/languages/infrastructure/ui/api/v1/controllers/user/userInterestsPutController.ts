import { Body, Controller, HttpCode, HttpStatus, Inject, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@src/shared/infrastructure/nestjs/guards/JwtAuthGuard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import UserInterestsPutDto from '@src/languages/infrastructure/ui/api/v1/controllers/user/userInterestsPutDto';
import UpdateUserInterestsCommand from '@src/languages/application/user/command/update/updateUserInterestsCommand';
import { Request } from 'express';

@ApiTags('User')
@Controller()
export default class UserInterestsPutController {
  public constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus) {}

  @Put('user/interests')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(JwtAuthGuard)
  async run(@Req() req: Request, @Body() payload: UserInterestsPutDto): Promise<any> {
    const userId = req.user['id'];
    await this.commandBus.dispatch(new UpdateUserInterestsCommand(userId, payload.interests));
  }
}
