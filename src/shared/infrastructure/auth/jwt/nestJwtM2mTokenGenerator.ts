import { Injectable } from '@nestjs/common';
import NestJwtTokenGenerator from '@src/shared/infrastructure/auth/jwt/nestJwtTokenGenerator';

@Injectable()
export default class NestJwtM2mTokenGenerator {
  private static M2M_USER_ROLE = 'internal';

  constructor(private readonly tokenGenerator: NestJwtTokenGenerator) {}

  generate(): { token: string; refreshToken: string } {
    const data = { role: NestJwtM2mTokenGenerator.M2M_USER_ROLE };
    return this.tokenGenerator.generate(data);
  }
}
