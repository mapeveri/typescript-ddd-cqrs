import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class WordDto {
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

export default class WordPostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  language_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({ type: [WordDto] })
  @Type(() => WordDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  terms: WordDto[];
}
