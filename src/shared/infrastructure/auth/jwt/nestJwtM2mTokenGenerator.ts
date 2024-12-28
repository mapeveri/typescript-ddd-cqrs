import { Injectable } from '@nestjs/common';
import NestJwtTokenGenerator from '@src/shared/infrastructure/auth/jwt/nestJwtTokenGenerator';

@Injectable()
export default class NestJwtM2mTokenGenerator {
  constructor(private readonly tokenGenerator: NestJwtTokenGenerator) {}

  generate(): { token: string; refreshToken: string } {
    const data = { role: 'internal' };
    return this.tokenGenerator.generate(data);
  }
}
