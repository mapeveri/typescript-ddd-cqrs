import { ApiProperty } from '@nestjs/swagger';
import { TermTypeEnum } from '@src/languages/domain/term/termType';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

class TermExpression {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  expression: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
  example: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  hashtags: Array<string>;
}

class TermWord {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  word: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
  example: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  hashtags: Array<string>;
}

class TermLike {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  termId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  photo: string;
}

export class TermResponse {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  languageId: string;

  @ApiProperty({ enum: TermTypeEnum, enumName: 'SearchTermType' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  countryId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  likes: TermLike[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  terms: Array<TermWord> | Array<TermExpression>;
}
