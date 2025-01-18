import GetUserSocialLoginQuery from '@src/account/application/auth/query/getUserSocialLoginQuery';
import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import LoginPostDto from './loginPostDto';
import LoginPostResponseDto from './loginPostResponseDto';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/bus/queryBus/queryBus';
import { IDENTITY_PROVIDER, IdentityProvider } from '@src/shared/domain/services/IdentityProvider';

@ApiTags('Auth')
@Controller()
export default class LoginPostController {
  public constructor(
    @Inject(QUERY_BUS) private queryBus: QueryBus,
    @Inject(IDENTITY_PROVIDER) private identityProvider: IdentityProvider,
  ) {}

  @Post('auth/login')
  @HttpCode(200)
  @ApiOkResponse({ type: LoginPostResponseDto })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async run(@Body() payload: LoginPostDto): Promise<LoginPostResponseDto> {
    const id = this.identityProvider.generateFromValue(payload.email);

    const response = await this.queryBus.ask(
      new GetUserSocialLoginQuery(id, payload.name, payload.email, payload.token, payload.provider, payload.photo),
    );

    return {
      user: response.content.user,
      token: response.content.token,
      refreshToken: response.content.refreshToken,
    };
  }
}
