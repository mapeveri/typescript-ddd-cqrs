import LoginUserCommand from '@src/languages/application/auth/command/loginUser/loginUserCommand';
import { Uuid } from '@src/shared/domain/valueObjects/uuid';
import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import LoginPostDto from './loginPostDto';
import LoginPostResponseDto from './loginPostResponseDto';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';

@ApiTags('Auth')
@Controller()
export default class LoginPostController {
  public constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus, private jwtService: JwtService) {}

  @Post('auth/login')
  @HttpCode(200)
  @ApiOkResponse({ type: LoginPostResponseDto })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async run(@Body() payload: LoginPostDto): Promise<LoginPostResponseDto> {
    const id = Uuid.fromString(payload.email).toString();
    await this.commandBus.dispatch(
      new LoginUserCommand(id, payload.name, payload.email, payload.token, payload.provider, payload.photo)
    );

    const user = { id: id, name: payload.name, email: payload.email };
    const token: string = this.jwtService.sign(user);
    const refreshToken: string = this.jwtService.sign(payload, { expiresIn: '30d' });

    return {
      user,
      token,
      refreshToken,
    };
  }
}
