import UnauthorizedException from '@src/shared/domain/exceptions/unauthorizedException';

export default class LoginException extends UnauthorizedException {
  constructor(email: string) {
    super(`Invalid login for email: ${email}`, 'invalid_login');
  }
}
