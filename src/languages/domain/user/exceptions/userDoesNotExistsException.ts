export default class UserDoesNotExistsException extends Error {
  public status = 401;

  constructor(public message: string = 'User doesn not exists.') {
    super();
  }
}
