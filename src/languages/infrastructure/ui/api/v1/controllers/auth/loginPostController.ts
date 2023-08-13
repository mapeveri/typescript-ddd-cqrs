import LoginUserCommand from '@src/languages/application/auth/command/loginUser/loginUserCommand';
import { Uuid } from '@src/shared/domain/valueObjects/uuid';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import LoginPostDto from './loginPostDto';

@Controller()
export default class LoginPostController {
  public constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus, private jwtService: JwtService) {}

  @Post('auth/login')
  async run(@Body() payload: LoginPostDto): Promise<any> {
    const id = Uuid.fromString(payload.email).toString();
    await this.commandBus.dispatch(
      new LoginUserCommand(id, payload.name, payload.email, payload.token, payload.provider, payload.photo)
    );

    const userPayload = { id: id, name: payload.name, email: payload.email };
    const token: string = this.jwtService.sign(userPayload);

    return {
      userPayload,
      token,
    };
  }
}
