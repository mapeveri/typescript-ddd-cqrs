import { Body, Controller, HttpCode, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { NestJwtAuthGuard } from '@src/shared/guards/nestJwtAuthGuard';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import LikeTermPostDto from '@src/languages/app/controllers/v1/terms/likeTermPostDto';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import AddLikeTermCommand from '@src/languages/application/term/command/create/addLikeTermCommand';

@ApiTags('terms')
@Controller()
export default class LikeTermPostController {
  constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus) {}

  @Post('terms')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(NestJwtAuthGuard)
  async run(@Body() payload: LikeTermPostDto): Promise<any> {
    await this.commandBus.dispatch(new AddLikeTermCommand(payload.termId, payload.type, payload.userId));
  }
}
