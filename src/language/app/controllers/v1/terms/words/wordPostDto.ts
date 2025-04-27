import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { WordDto } from '@src/language/app/controllers/v1/terms/words/wordDto';

export default class WordPostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  languageId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  countryId: string;

  @ApiProperty({ type: [WordDto] })
  @Type(() => WordDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  terms: WordDto[];
}
