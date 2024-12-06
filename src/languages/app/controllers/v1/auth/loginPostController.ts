import GetUserLoginQuery from '@src/languages/application/auth/query/getUserLoginQuery';
import { Uuid } from '@src/shared/domain/valueObjects/uuid';
import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import LoginPostDto from './loginPostDto';
import LoginPostResponseDto from './loginPostResponseDto';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/bus/queryBus/queryBus';

@ApiTags('Auth')
@Controller()
export default class LoginPostController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus) {}

  @Post('auth/login')
  @HttpCode(200)
  @ApiOkResponse({ type: LoginPostResponseDto })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async run(@Body() payload: LoginPostDto): Promise<LoginPostResponseDto> {
    const id = Uuid.fromString(payload.email).toString();

    const response = await this.queryBus.ask(
      new GetUserLoginQuery(id, payload.name, payload.email, payload.token, payload.provider, payload.photo),
    );

    console.log(response);

    return {
      user: response.content.user,
      token: response.content.token,
      refreshToken: response.content.refreshToken,
    };
  }
}
