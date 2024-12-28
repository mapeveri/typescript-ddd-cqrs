import { Injectable } from '@nestjs/common';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import Logger, { LOGGER } from '@src/shared/domain/logger';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class NestJwtTokenGenerator {
  constructor(private readonly jwtService: JwtService, @Inject(LOGGER) private readonly logger: Logger) {}

  generate(data: object): { token: string; refreshToken: string } {
    this.logger.log(`[NestJwtTokenGenerator]: ${JSON.stringify(data)}`);

    const token: string = this.jwtService.sign(data);
    const refreshToken: string = this.jwtService.sign(data, { expiresIn: '30d' });

    return {
      token,
      refreshToken,
    };
  }
}
