import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderType } from '@src/shared/domain/criteria/orderBy';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchTermsQueryParamsDto {
  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  size: number = 10;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  orderBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'], { message: 'Invalid order type. Must be "asc" or "desc".' })
  orderType?: OrderType;
}
