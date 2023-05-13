export default class ApiResponseException extends Error {
  constructor(public message: string, public status: number, public code: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}
