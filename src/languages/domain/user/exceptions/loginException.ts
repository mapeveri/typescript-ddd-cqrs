import UnauthorizedException from '@src/shared/domain/exceptions/unauthorizedException';

export default class LoginException extends UnauthorizedException {
  constructor() {
    super('Invalid login', 'invalid_login');
  }
}
