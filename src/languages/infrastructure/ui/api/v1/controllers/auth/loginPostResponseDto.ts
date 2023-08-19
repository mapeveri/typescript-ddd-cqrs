import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class UserResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export default class LoginPostResponseDto {
  @ApiProperty({ type: UserResponseDto })
  @IsNotEmpty()
  user: UserResponseDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;
}
