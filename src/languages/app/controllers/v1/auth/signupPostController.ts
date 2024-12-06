import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import SignupPostDto from '@src/languages/app/controllers/v1/auth/signupPostDto';

@ApiTags('Auth')
@Controller()
export default class SignupPostController {
  public constructor() {}

  @Post('auth/signup')
  @HttpCode(201)
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async run(@Body() _payload: SignupPostDto): Promise<void> {
    throw new Error('Not implemented');
  }
}
