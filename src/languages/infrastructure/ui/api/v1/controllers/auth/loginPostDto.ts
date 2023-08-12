import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class LoginPostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  provider: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  photo: string;
}
