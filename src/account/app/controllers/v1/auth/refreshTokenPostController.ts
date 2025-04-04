import { Body, Controller, HttpCode, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import LoginPostResponseDto from './loginPostResponseDto';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import RefreshTokenPostDto from './refreshTokenPostDto';
import RefreshTokenPostResponseDto from './refreshTokenPostResponseDto';
import { QUERY_BUS, QueryBus } from '@src/shared/domain/bus/queryBus/queryBus';
import FindUserQuery from '@src/account/application/user/query/findUserQuery';

@ApiTags('Auth')
@Controller()
export default class RefreshTokenPostController {
  public constructor(@Inject(QUERY_BUS) private queryBus: QueryBus, private jwtService: JwtService) {}

  @Post('auth/refresh-token')
  @HttpCode(200)
  @ApiOkResponse({ type: LoginPostResponseDto })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async run(@Body() payload: RefreshTokenPostDto): Promise<RefreshTokenPostResponseDto> {
    let decodedRefreshToken;

    try {
      decodedRefreshToken = this.jwtService.verify(payload.refreshToken);
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }

    if (decodedRefreshToken.revoked) {
      throw new HttpException('Token revoked', HttpStatus.FORBIDDEN);
    }

    const user = await this.queryBus.ask(new FindUserQuery(decodedRefreshToken.id));
    const refreshToken = this.jwtService.sign(user.content);

    return {
      refreshToken,
    };
  }
}
