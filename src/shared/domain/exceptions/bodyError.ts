export default class BodyError extends Error {
  public status = 400;
  constructor(public message: string) {
    super();
  }
}
