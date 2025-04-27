import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsNotEmpty, IsString } from 'class-validator';

export class WordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  word: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @ArrayNotEmpty()
  hashtags: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  example: string;
}
