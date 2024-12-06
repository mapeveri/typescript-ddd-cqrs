import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import SignupPostDto from '@src/languages/app/controllers/v1/auth/signupPostDto';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import SignupUserCommand from '@src/languages/application/auth/command/signupUserCommand';
import { Uuid } from '@src/shared/domain/valueObjects/uuid';

@ApiTags('Auth')
@Controller()
export default class SignupPostController {
  public constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus) {}

  @Post('auth/signup')
  @HttpCode(201)
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async run(@Body() payload: SignupPostDto): Promise<void> {
    const id = Uuid.fromString(payload.email).toString();

    await this.commandBus.dispatch(
      new SignupUserCommand(id, payload.name, payload.email, payload.token, payload.provider, payload.photo),
    );
  }
}
