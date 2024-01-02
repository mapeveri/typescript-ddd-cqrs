import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class TermResponse {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  example: string;

  @ApiProperty({ enum: ['word', 'expression'], enumName: 'SearchTermType' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  hashtags: Array<string>;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  likes: Array<string>;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  disLikes: Array<string>;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  favourites: Array<string>;
}
