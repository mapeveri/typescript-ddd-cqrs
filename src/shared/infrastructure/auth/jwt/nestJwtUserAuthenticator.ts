import { Injectable } from '@nestjs/common';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import Logger, { LOGGER } from '@src/shared/domain/logger';
import { UserAuthenticator, UserAuthenticatorResponse } from '@src/shared/domain/auth/userAuthenticator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class NestJwtUserAuthenticator implements UserAuthenticator {
  constructor(private readonly jwtService: JwtService, @Inject(LOGGER) private readonly logger: Logger) {}

  sign(user: object): UserAuthenticatorResponse {
    this.logger.log(`User authenticator: ${JSON.stringify(user)}`);

    const token: string = this.jwtService.sign(user);
    const refreshToken: string = this.jwtService.sign(user, { expiresIn: '30d' });

    return {
      token,
      refreshToken,
    };
  }
}
