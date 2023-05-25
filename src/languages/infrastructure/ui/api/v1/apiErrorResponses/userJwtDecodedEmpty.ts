import ApiResponseException from '@src/shared/infrastructure/api/apiErrorResponses/apiResponseException';

export default class UserJwtDecodedEmpty extends ApiResponseException {
  constructor(
    public message = 'User decoded empty',
    public status: number = 404,
    public code: string = 'user_jwt_decoded_empty'
  ) {
    super(message, status, code);
  }
}
