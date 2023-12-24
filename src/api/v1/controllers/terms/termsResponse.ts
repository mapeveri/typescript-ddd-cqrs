import { IsArray, IsNotEmpty } from 'class-validator';
import { TermResponse } from './termResponse';
import { ApiProperty } from '@nestjs/swagger';

export class TermsResponse {
  @ApiProperty({ type: [TermResponse] })
  @IsNotEmpty()
  @IsArray()
  content: TermResponse[];
}
