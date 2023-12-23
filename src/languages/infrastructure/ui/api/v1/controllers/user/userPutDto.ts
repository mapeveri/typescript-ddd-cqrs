import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsNotEmpty, IsString } from 'class-validator';

export default class UserPutDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  photo: string;

  @ApiProperty()
  @IsNotEmpty()
  @ArrayNotEmpty()
  interests: string[];
}
