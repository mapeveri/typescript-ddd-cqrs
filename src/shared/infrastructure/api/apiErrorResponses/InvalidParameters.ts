import ApiResponseException from './apiResponseException';

export default class InvalidParameters extends ApiResponseException {
  constructor(
    public message: string = 'Invalid parameters',
    public code: string = 'invalid_parameters',
    public status: number = 400
  ) {
    super(message, status, code);
  }
}
