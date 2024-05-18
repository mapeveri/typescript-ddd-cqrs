import { Controller, HttpCode, HttpStatus, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { NestJwtAuthGuard } from '@src/shared/guards/nestJwtAuthGuard';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import AddLikeTermCommand from '@src/languages/application/term/command/addLikeTermCommand';
import { Request } from 'express';

@ApiTags('terms')
@Controller()
export default class LikeTermPostController {
  constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus) {}

  @Post('terms/:id/add-like')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(NestJwtAuthGuard)
  async run(@Param('id') id: string, @Req() req: Request): Promise<any> {
    const userId = req.user['id'];
    await this.commandBus.dispatch(new AddLikeTermCommand(id, userId));
  }
}
