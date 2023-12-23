import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export default class UserInterestsPutDto {
  @ApiProperty()
  @IsNotEmpty()
  @ArrayNotEmpty()
  interests: string[];
}
