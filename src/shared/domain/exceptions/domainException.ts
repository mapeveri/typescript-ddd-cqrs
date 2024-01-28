export default class DomainException extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.code = code;
  }
}
