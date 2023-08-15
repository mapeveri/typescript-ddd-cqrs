import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class LanguageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  languageId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

export default class CountryPostDto {
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
  @IsString()
  iso: string;

  @ApiProperty({ type: [LanguageDto] })
  @Type(() => LanguageDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  languages: LanguageDto[];
}
