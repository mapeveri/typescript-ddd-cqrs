import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class LikeTermPostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  termId: string;

  @ApiProperty({ type: String, enum: ['word', 'expression'] })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
}
