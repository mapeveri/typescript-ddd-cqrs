import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import LoginPostResponseDto from './loginPostResponseDto';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import SignupPostDto from './signupPostDto';

@ApiTags('Auth')
@Controller()
export default class SignupPostController {
  @Post('auth/signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: LoginPostResponseDto })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async run(@Body() _payload: SignupPostDto): Promise<void> {
  }
}
