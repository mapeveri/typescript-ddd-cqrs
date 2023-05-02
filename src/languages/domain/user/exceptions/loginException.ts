export default class LoginException extends Error {
  public status = 401;

  constructor(public message: string = 'Invalid login.') {
    super();
  }
}
