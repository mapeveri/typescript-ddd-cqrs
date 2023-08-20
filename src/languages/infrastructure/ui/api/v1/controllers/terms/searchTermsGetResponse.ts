import { IsArray, IsNotEmpty } from 'class-validator';
import { SearchTermGetResponse } from './searchTermGetResponse';
import { ApiProperty } from '@nestjs/swagger';

export class SearchTermsGetResponse {
  @ApiProperty({ type: [SearchTermGetResponse] })
  @IsNotEmpty()
  @IsArray()
  content: SearchTermGetResponse[];
}
