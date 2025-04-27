import { IsArray, IsNotEmpty } from 'class-validator';
import { TermViewResponse } from './termViewResponse';
import { ApiProperty } from '@nestjs/swagger';

export class TermViewsResponse {
  @ApiProperty({ type: [TermViewResponse] })
  @IsNotEmpty()
  @IsArray()
  content: TermViewResponse[];
}
