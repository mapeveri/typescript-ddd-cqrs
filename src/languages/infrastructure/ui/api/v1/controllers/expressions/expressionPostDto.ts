import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class ExpressionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  expression: string;

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

export default class ExpressionPostDto {
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

  @ApiProperty({ type: [ExpressionDto] })
  @Type(() => ExpressionDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  terms: ExpressionDto[];
}
