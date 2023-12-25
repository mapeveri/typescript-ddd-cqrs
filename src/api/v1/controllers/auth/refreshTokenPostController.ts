import { Body, Controller, HttpCode, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import LoginPostResponseDto from './loginPostResponseDto';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import RefreshTokenPostDto from './refreshTokenPostDto';
import RefreshTokenPostResponseDto from './refreshTokenPostResponseDto';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/buses/queryBus/queryBus';
import FindUserQuery from '@src/languages/application/user/query/find/findUserQuery';

@ApiTags('Auth')
@Controller()
export default class RefreshTokenPostController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus, private jwtService: JwtService) {}

  @Post('auth/refresh-token')
  @HttpCode(200)
  @ApiOkResponse({ type: LoginPostResponseDto })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async run(@Body() payload: RefreshTokenPostDto): Promise<RefreshTokenPostResponseDto> {
    const decodedRefreshToken = this.jwtService.verify(payload.refreshToken);
    if (decodedRefreshToken.revoked) {
      throw new HttpException('Token revocado', HttpStatus.FORBIDDEN);
    }

    const user = await this.queryBus.ask(new FindUserQuery(decodedRefreshToken.id));
    const refreshToken = this.jwtService.sign(user.content);

    return {
      refreshToken,
    };
  }
}
