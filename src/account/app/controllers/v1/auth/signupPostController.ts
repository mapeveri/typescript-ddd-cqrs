import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import SignupPostDto from '@src/account/app/controllers/v1/auth/signupPostDto';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import SignUpUserCommand from '@src/account/application/auth/command/signUpUserCommand';
import { IDENTITY_PROVIDER, IdentityProvider } from '@src/shared/domain/services/IdentityProvider';

@ApiTags('Auth')
@Controller()
export default class SignupPostController {
  public constructor(
    @Inject(COMMAND_BUS) private commandBus: CommandBus,
    @Inject(IDENTITY_PROVIDER) private identityProvider: IdentityProvider,
  ) {}

  @Post('auth/signup')
  @HttpCode(201)
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async run(@Body() payload: SignupPostDto): Promise<void> {
    const id = this.identityProvider.generateFromValue(payload.email);

    await this.commandBus.dispatch(
      new SignUpUserCommand(id, payload.name, payload.email, payload.token, payload.provider, payload.photo),
    );
  }
}
