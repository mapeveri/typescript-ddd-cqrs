import { Injectable } from '@nestjs/common';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import Logger, { LOGGER } from '@src/shared/domain/services/logger';

import { SignUser, UserAuthenticator, UserAuthenticatorResponse } from '@src/account/domain/auth/userAuthenticator';
import NestJwtTokenGenerator from '@src/shared/infrastructure/auth/jwt/nestJwtTokenGenerator';

@Injectable()
export default class NestJwtUserAuthenticator implements UserAuthenticator {
  private static CLIENT_USER_ROLE = 'external';

  constructor(
    private readonly nestJsTokenGenerator: NestJwtTokenGenerator,
    @Inject(LOGGER) private readonly logger: Logger,
  ) {}

  sign(user: SignUser): UserAuthenticatorResponse {
    const data = {
      ...user,
      role: NestJwtUserAuthenticator.CLIENT_USER_ROLE,
    };

    this.logger.log(`User authenticator: ${JSON.stringify(data)}`);

    return this.nestJsTokenGenerator.generate(data);
  }
}
